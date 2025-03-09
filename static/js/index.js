const tg = window.Telegram.WebApp;
const AdController = window.Adsgram.init({ blockId: "3602" });
const colors = ['red', 'blue', 'green', 'blush', 'orange', 'purple', 'pink', 'brown', 'gray', 'cyan'];

// лоудер
window.addEventListener('load', () => {
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.expand();
    }
    const loaderWrapper = document.getElementById('loader-wrapper');
    const wrapper = document.querySelector('.wrapper');
    setTimeout(() => {
        loaderWrapper.style.display = 'none';
        wrapper.style.display = 'block';
        wrapper.removeAttribute('style');
    }, 2500);
});


function formatNumberWithSpaces(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}


function blocksDisplay() {
    const homeContainer = document.getElementById('homeContainer');
    const tasksContainer = document.getElementById('tasksContainer');
    const friendsContainer = document.getElementById('friendsContainer');
    const friendsListContainer = document.getElementById('friendsContent');
    const hallContentContainer = document.getElementById('hallContent');

    function showContainer(container) {
        container.classList.add('fade-in');
        container.style.display = 'block';
        setTimeout(() => container.classList.remove('fade-in'), 200);
    }

    function hideContainer(container) {
        container.classList.add('fade-out');
        setTimeout(() => {
            container.style.display = 'none';
            container.classList.remove('fade-out');
        }, 200);
    }

    function showContainerFast(container) {
        container.classList.add('fade-in');
        container.style.display = 'block';
        container.classList.remove('fade-in');
    }

    function hideContainerFast(container) {
        container.classList.add('fade-out');
        container.style.display = 'none';
        container.classList.remove('fade-out');
    }


    document.getElementById('homeButton').addEventListener('click', function () {
        hideContainer(tasksContainer);
        hideContainer(friendsContainer);
        setTimeout(() => showContainer(homeContainer), 200);
        updateActiveButton('homeButton');
        getHomeData();
    });

    document.getElementById('tasksButton').addEventListener('click', function () {
        hideContainer(homeContainer);
        hideContainer(friendsContainer);
        setTimeout(() => showContainer(tasksContainer), 200); 
        updateActiveButton('tasksButton');
        getTasksData();
    });

    document.getElementById('friendsButton').addEventListener('click', function () {
        hideContainer(homeContainer);
        hideContainer(tasksContainer);
        setTimeout(() => showContainer(friendsContainer), 200);
        updateActiveButton('friendsButton');
        getFriendsData();
    });

    document.getElementById('friendsHall_list').addEventListener('click', function () {
        hideContainerFast(friendsListContainer);
        showContainerFast(hallContentContainer);
        updateActiveButtonTop('friendsHall_list');
        getHallData();
    });

    document.getElementById('friendsFriends_list').addEventListener('click', function () {
        hideContainerFast(hallContentContainer);
        showContainerFast(friendsListContainer);
        updateActiveButtonTop('friendsFriends_list');
        getFriendsData();
    });
}


// Обновление активной кнопки в заголовке
function updateActiveButtonTop(activeButtonId) {
    const buttons = document.querySelectorAll('.hells__title');
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    document.getElementById(activeButtonId).classList.add('active');
}


// Обновление активной кнопки в футере
function updateActiveButton(activeButtonId) {
    const buttons = document.querySelectorAll('.footer__link');
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    document.getElementById(activeButtonId).classList.add('active');
}


function gameStart() {
        document.getElementById('play_button').addEventListener('click', function () {
            // Проверяем, является ли устройство Android или iOS
            var isAndroid = /Android/i.test(navigator.userAgent);
            var isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

            if (isAndroid || isIOS) {
                // Если устройство Android или iOS, выполняем перенаправление
                window.location.href = `${urlPrefix}/game`;
            } else {
                // Если устройство не мобильное, выводим предупреждение
                // window.location.href = `${urlPrefix}/game`; //Временно разрешаем
                alert('Этот контент доступен только на мобильных устройствах (Android или iOS).');
            }

        });
};

//Home section
let timerInterval;

async function getHomeData() {
    let profile_data = await apiGetProfile(tg.initDataUnsafe.user.id)
    if (tg.initDataUnsafe.user.username) {
        document.getElementById('home_username').textContent = tg.initDataUnsafe.user.username;
    } else {
        document.getElementById('home_username').textContent = tg.initDataUnsafe.user.first_name;
    }
    document.getElementById('home_userbalance').textContent = formatNumberWithSpaces(profile_data.tokens);
    document.querySelector('.progressbar__info').textContent = `${profile_data.energy.current} / 10`;
    document.querySelector('.progressbar__thumb').style.width = `${profile_data.energy.current * 10}%`;

    // Функция для форматирования времени в минутах и секундах

    function padNumber(number) {
        return number < 10 ? `0${number}` : number;
    }

    function formatTimeDiff(timeDiff) {
        const minutes = Math.floor(timeDiff / 1000 / 60);
        const seconds = Math.floor((timeDiff / 1000) % 60);
        return `${padNumber(minutes)}:${padNumber(seconds)}`;
    }

    // Функция для обновления таймера
    function updateTimer() {
        const currentTime = new Date();
        if (profile_data.energy.next_recovery_time) {
            const nextRecoveryTime = new Date(profile_data.energy.next_recovery_time);
            const timeDiff = nextRecoveryTime - currentTime;
            if (timeDiff <= 0) {
                clearInterval(timerInterval); // Останавливаем таймер
                getHomeData();
            } else {
                document.getElementById('energy-timer').textContent = `${formatTimeDiff(timeDiff)}`;
            }
        } else {
            document.getElementById('energy-timer').textContent = 'Full';
        }
    }

    if (timerInterval) {
        clearInterval(timerInterval);
    }
    timerInterval = setInterval(updateTimer, 1000);


    if (profile_data.daily_data.display) {
        document.getElementById('homeContainer').style.display = 'none';
        document.getElementById('footerContainer').style.display = 'none';
        document.getElementById('dailyContainer').style.display = 'block';
        document.getElementById('dailyTitle').textContent = profile_data.daily_data.display.title;
        document.getElementById('dailySum').textContent = profile_data.daily_data.display.reward;

        document.getElementById('dailyButton').addEventListener('click', function () {
            dailyClick(tg.initDataUnsafe.user.id);
        });
    }


    async function dailyClick() {
        let tasks_response = await apiDailyClick(tg.initDataUnsafe.user.id);
        document.getElementById('home_userbalance').textContent = tasks_response.tokens;
        document.getElementById('dailyContainer').style.display = 'none';
        document.getElementById('homeContainer').style.display = 'block';
        document.getElementById('footerContainer').style.display = 'block';
    }

};


//Tasks section
async function getTasksData(){

    function generateTasks(tasks) {
            const container = document.getElementById('tasks-container');
            container.innerHTML = ''; // Clear existing tasks

            tasks.forEach((task, index) => {
                const taskItem = document.createElement('div');
                taskItem.className = 'tasks__item';

                const taskIcon = document.createElement('div');
                taskIcon.className = 'tasks__item-icon';
                if (task.condition.action === 'join') {
                    if (task.title === 'Prompt Marketplace for AI'){
                        taskIcon.innerHTML = `<img src="static/img/telegram.svg" alt="">`;
                    };
                    if (task.title === 'Join Glow Channel'){
                        taskIcon.innerHTML = `<img src="static/img/telegram.svg" alt="">`;
                    };
                    if (task.title === 'Watch short video'){
                        taskIcon.innerHTML = `<img src="static/img/video.svg" alt="">`;
                    };
                    if (task.title === 'Join Glow on X.com'){
                        taskIcon.innerHTML = `<img src="static/img/twitter.svg" alt="">`;
                    };
                    if (task.title === 'Share your story'){
                        taskIcon.innerHTML = `<img src="static/img/telegram.svg" alt="">`;
                    };
                    if (task.title === 'React to a meme token post on X'){
                        taskIcon.innerHTML = `<img src="static/img/twitter.svg" alt="">`;
                    };
                    if (task.title === 'React to a special giveaway on X'){
                        taskIcon.innerHTML = `<img src="static/img/twitter.svg" alt="">`;
                    };
                    if (task.title === 'Join Glow on TikTok'){
                        taskIcon.innerHTML = `<img src="static/img/tiktok.svg" alt="">`;
                    };
                    if (task.title === 'Join Glow on Instagram'){
                        taskIcon.innerHTML = `<img src="static/img/instagram.svg" alt="">`;
                    };
                    if (task.title === 'Join Caerus'){
                        taskIcon.innerHTML = `<img src="static/img/partnerss.svg" alt="">`;
                    };
                    if (task.title === 'Join Joker'){
                        taskIcon.innerHTML = `<img src="static/img/partnerss.svg" alt="">`;
                    };
                    if (task.title === 'Join GMR Arcade'){
                        taskIcon.innerHTML = `<img src="static/img/partnerss.svg" alt="">`;
                    };
                    if (task.title === 'Join PigglyLand'){
                        taskIcon.innerHTML = `<img src="static/img/partnerss.svg" alt="">`;
                    };
                    if (task.title === 'Follow PigglyLand Channel'){
                        taskIcon.innerHTML = `<img src="static/img/partnerss.svg" alt="">`;
                    };
                    if (task.title === 'Join Chickizen'){
                        taskIcon.innerHTML = `<img src="static/img/partnerss.svg" alt="">`;
                    };
                }
                if (task.condition.action === 'gain') {
                    taskIcon.innerHTML = `<img src="static/img/task_gain.svg" alt="">`;
                }
                if (task.condition.action === 'invite') {
                    taskIcon.innerHTML = `<img src="static/img/task_invite.svg" alt="">`;
                }


                const taskDescription = document.createElement('div');
                taskDescription.className = 'tasks__item-description';
                taskDescription.innerHTML = `
                    <p>${task.title}</p>
                    <div class="summ__coins">
                        <div class="summ__coins-img">
                            <picture>
                                <source srcset="static/img/coin.webp" type="image/webp">
                                <img src="static/img/coin.png" alt="">
                            </picture>
                        </div>
                        <p>${task.reward}</p>
                    </div>
                `;

                const taskButton = document.createElement('button');
                taskButton.className = 'tasks__item-btn';
                taskButton.setAttribute('data-title', task.title);
                if (task.status === 'start') {
                    taskButton.textContent = 'Start';
                } else if (task.status === 'started') {
                    taskButton.innerHTML = `<img src="static/img/ellipsis.svg" alt="">`;
                } else if (task.status === 'claim') {
                    taskButton.textContent = 'Claim';
                    taskButton.classList.add('active');
                } else if (task.status === 'claimed') {
                    taskButton.innerHTML = `<img src="static/img/check_mark.svg" alt="">`;
                }

                taskButton.addEventListener('click', function() {
                    const task_data = {id: tg.initDataUnsafe.user.id, title: this.getAttribute('data-title')};
                    if (this.getAttribute('data-title') === 'Prompt Marketplace for AI'){
                        Telegram.WebApp.openLink('https://findprompt.shop');
                        taskClickUpdate(task_data);
                    };

                    if (this.getAttribute('data-title') === 'Join Glow Channel'){
                        window.location.href = 'https://t.me/Glow_Stories';
                        taskClickUpdate(task_data);
                    };

                    if (this.getAttribute('data-title') === 'Watch short video'){
                        AdController.show().then((result) => {
                            taskClickUpdate(task_data);
                        }).catch((result) => {});
                    };

                    if (this.getAttribute('data-title') === 'Join Glow on X.com'){
                        Telegram.WebApp.openLink('https://x.com/Glow_Stories');
                        taskClickUpdate(task_data);
                    };

                    if (this.getAttribute('data-title') === 'Share your story'){
                        try {
                            const mediaUrl = `${urlPrefix}/post_stories?user_id=${tg.initDataUnsafe.user.id}`;
                            const params = {
                                text: `Try to beat my high score and earn money in t.me/SecretGlowBot #TON #AirDrop #web_apps #games`,
                                widget_link: {
                                    url: `https://t.me/SecretGlowBot?start=${tg.initDataUnsafe.user.id}`,
                                    name: 'Play Now!'
                                }
                            };
                            window.Telegram.WebApp.shareToStory(mediaUrl, params);
                            taskClickUpdate(task_data);
                        }
                        catch (error) {
                            sendLogToServer(error.message)
                        }
                    };

                    if (this.getAttribute('data-title') === 'React to a meme token post on X'){
                        Telegram.WebApp.openLink('https://x.com/Glow_Stories/status/1864618425441529922');
                        taskClickUpdate(task_data);
                    };

                    if (this.getAttribute('data-title') === 'React to a special giveaway on X'){
                        Telegram.WebApp.openLink('https://x.com/Glow_Stories/status/1864628838635880830');
                        taskClickUpdate(task_data);
                    };

                    if (this.getAttribute('data-title') === 'Join Glow on TikTok'){
                        Telegram.WebApp.openLink('https://www.tiktok.com/@secretglow.io');
                        taskClickUpdate(task_data);
                    };

                    if (this.getAttribute('data-title') === 'Join Glow on Instagram'){
                        Telegram.WebApp.openLink('https://www.instagram.com/secretglow.io');
                        taskClickUpdate(task_data);
                    };

                    if (this.getAttribute('data-title') === 'Join Caerus'){
                        window.location.href = ('https://t.me/caeruscasinobot/app?startapp=glow');
                        taskClickUpdate(task_data);
                    };

                    if (this.getAttribute('data-title') === 'Join Joker'){
                        window.location.href = 'https://t.me/joker_neobot/app?startapp=5104108525';
                        taskClickUpdate(task_data);
                    };

                    if (this.getAttribute('data-title') === 'Join GMR Arcade'){
                        window.location.href = 'https://t.me/GMRArcadeBot/LeetClicker?startapp=kentId745218688';
                        taskClickUpdate(task_data);
                    };

                    if (this.getAttribute('data-title') === 'Join PigglyLand'){
                        window.location.href = 'https://t.me/piggyland_bot/app?startapp=90000008';
                        taskClickUpdate(task_data);
                    };

                    if (this.getAttribute('data-title') === 'Follow PigglyLand Channel'){
                        window.location.href = 'https://t.me/Piggyland_ann';
                        taskClickUpdate(task_data);
                    };

                    if (this.getAttribute('data-title') === 'Join Chickizen'){
                        window.location.href = 'https://t.me/chickizenbot/app?startapp=5104108525';
                        taskClickUpdate(task_data);
                    };

                });

                taskItem.appendChild(taskIcon);
                taskItem.appendChild(taskDescription);
                taskItem.appendChild(taskButton);
                container.appendChild(taskItem);
            });
        };

    function tasksDisplay() {
        if (tg.initDataUnsafe.user.username) {
            document.getElementById('tasks_username').textContent = tg.initDataUnsafe.user.username;
        } else {
            document.getElementById('tasks_username').textContent = tg.initDataUnsafe.user.first_name;
        }
        document.getElementById('tasks_userbalance').textContent = formatNumberWithSpaces(profile_data.earned);
    };

    async function taskClickUpdate(task_data) {
        let tasks_response = await apiTaskClick(task_data);
        document.getElementById('tasks_userbalance').textContent = formatNumberWithSpaces(tasks_response.earned);
        generateTasks(tasks_response.tasks);
}

    let profile_data = await apiGetProfile(tg.initDataUnsafe.user.id);
    generateTasks(profile_data.tasks);
    tasksDisplay();
};



//Friends section
async function getFriendsData() {

    function createFriendsList(referrals) {
            const friendsListItems = document.getElementById('friendsListItems');
            friendsListItems.innerHTML = ''; // Очищаем текущий список

            referrals.forEach(referral => {
                const item = document.createElement('div');
                item.className = 'friends__list-item';

                const icon = document.createElement('div');
                icon.className = 'friends__list-icon';
                let lastDigit = referral.id % 10;
                icon.style.backgroundColor = colors[lastDigit];
                icon.innerHTML = `<img src="static/img/ghost200x200.png" alt="">`;

                const name = document.createElement('p');
                name.className = 'friends__list-name';
                name.textContent = referral.name;

                const score = document.createElement('div');
                score.className = 'friends__list-score';
                score.innerHTML = `
                    <picture>
                        <source srcset="static/img/score.svg" type="image/svg+xml">
                        <img src="static/img/score.svg" alt="">
                    </picture>
                    <span class="marg-t2">${referral.top_score}</span>
                `;

                const coins = document.createElement('div');
                coins.className = 'friends__list-coins';
                coins.innerHTML = `
                    <picture>
                        <source srcset="static/img/coin.webp" type="image/webp">
                        <img src="static/img/coin.png" alt="">
                    </picture>
                    <span class="marg-t2">${formatNumberWithSpaces(referral.earned)}</span>
                `;

                item.appendChild(icon);
                item.appendChild(name);
                item.appendChild(score);
                item.appendChild(coins);

                friendsListItems.appendChild(item);
            });
        }

    function friendsDisplay(profile_data) {
        document.getElementById('friends_userbalance').textContent = formatNumberWithSpaces(profile_data.ref.to_claim);
        document.getElementById('freinds_userBestResult').textContent = profile_data.game.best.score;
        if (profile_data.ref.to_claim > 10) {
            document.getElementById('friends_claimButton').style.display = 'block';
            document.getElementById('friends_claimButton').addEventListener('click', function() {
                friendsClaimClick(tg.initDataUnsafe.user.id)
            });
        } else {
            document.getElementById('friends_claimButton').style.display = 'none';
        };

        document.getElementById('friendsListAllscore').textContent = profile_data.ref.friends_count;

        document.getElementById('inviteFriendsButton').addEventListener('click', function() {
            const referral_link = `https://t.me/SecretGlowBot?start=${tg.initDataUnsafe.user.id}`;
            const share_link = `https://t.me/share/url?url=${encodeURIComponent(referral_link)}&text=Not for people!`;
            window.location.href = share_link;
        });
    };

    async function friendsClaimClick(tg_id) {
        let profile_data = await apiFriendsClaim(tg_id);
        friendsDisplay(profile_data);

}

    let profile_data = await apiGetProfile(tg.initDataUnsafe.user.id);
    friendsDisplay(profile_data);
    createFriendsList(profile_data.ref.referrals);
};

// Hall section
async function getHallData(){
    let hall_data = await apiGetHall(tg.initDataUnsafe.user.id);
    document.getElementById('hall_user_name').textContent = hall_data.user_name;
    document.getElementById('liderboard_user_score').textContent = hall_data.user_score;
    if (hall_data.user_rank === 1) {
            document.getElementById('liderboard_user_rank').textContent = '🥇';
        } else if (hall_data.user_rank === 2) {
            document.getElementById('liderboard_user_rank').textContent = '🥈';
        } else if (hall_data.user_rank === 3) {
            document.getElementById('liderboard_user_rank').textContent = '🥉';
        } else {
            document.getElementById('liderboard_user_rank').textContent = `#${hall_data.user_rank}`;
        }

    const container = document.getElementById('leaderboard-container');
    container.innerHTML = '';

    hall_data.hall.forEach(player => {
        const listItem = document.createElement('div');
        listItem.className = 'leaderboard__list';

        const iconDiv = document.createElement('div');
        iconDiv.className = 'summ__icon';
        let lastDigit = player.tg_id % 10;
        iconDiv.style.backgroundColor = colors[lastDigit];

        const iconImg = document.createElement('img');
        iconImg.src = '/static/img/ghost-hres.png';
        iconImg.alt = '';
        iconDiv.appendChild(iconImg);

        const nameDiv = document.createElement('div');
        nameDiv.className = 'leaderboard__top-name';

        const nameP = document.createElement('p');
        nameP.textContent = player.name;

        const coinsDiv = document.createElement('div');
        coinsDiv.className = 'summ__coins';

        const coinsImgDiv = document.createElement('div');
        coinsImgDiv.className = 'summ__coins-img';

        const coinsPicture = document.createElement('picture');
        const coinsSource = document.createElement('source');
        coinsSource.srcset = '/static/img/score.png';
        coinsSource.type = 'image/webp';

        const coinsImg = document.createElement('img');
        coinsImg.src = '/static/img/score.png';
        coinsImg.alt = '';

        coinsPicture.appendChild(coinsSource);
        coinsPicture.appendChild(coinsImg);
        coinsImgDiv.appendChild(coinsPicture);

        const scoreP = document.createElement('p');
        scoreP.textContent = player.score;

        coinsDiv.appendChild(coinsImgDiv);
        coinsDiv.appendChild(scoreP);

        nameDiv.appendChild(nameP);
        nameDiv.appendChild(coinsDiv);

        const rankDiv = document.createElement('div');
        rankDiv.className = 'leaderboard__top-id';
        if (player.rank === 1) {
            rankDiv.textContent = '🥇';
        } else if (player.rank === 2) {
            rankDiv.textContent = '🥈';
        } else if (player.rank === 3) {
            rankDiv.textContent = '🥉';
        } else {
            rankDiv.textContent = `#${player.rank}`;
        }

        listItem.appendChild(iconDiv);
        listItem.appendChild(nameDiv);
        listItem.appendChild(rankDiv);

        container.appendChild(listItem);
    });
};


//ADS section
async function adsStart() {
    AdController.show().then((result) => {
        return result
    }).catch((result) => {
        return False
    });
}


//Start
document.addEventListener('DOMContentLoaded', function() {
    gameStart();
    getHomeData();
    blocksDisplay();
});


