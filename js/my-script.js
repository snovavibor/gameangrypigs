class birds {
    constructor(picter, width, height, time, name, point) {
        this.picter = picter;
        this.width = width + 'px';
        this.height = height + 'px';
        this.time = time;
        this.name = name;
        this.point = parseInt(point);
    };


    displayBirds() {
        let picterMain = wrap.appendChild(document.createElement('div'));
        picterMain.setAttribute('id', this.name);
        picterMain.setAttribute('data-log', 1);
        picterMain.setAttribute('style', 'width:' + this.width + ';height:' + this.height +
            ';background: url(' + this.picter + ')no-repeat;background-size:contain;position:absolute; left:' +
            this.x + 'px; top:' + this.y + 'px;z-index:5;');

        this.fly();

        this.boom();
    };


    fly() {
        let bird = document.getElementById(this.name);

        if (bird.getAttribute('data-log') == 1) {
            let x = Math.random() * ((parseInt(mainWidth) - parseInt(this.width)) - 1) + 1;
            let y = Math.random() * ((parseInt(mainHeight) - parseInt(this.height)) - 1) + 1;
            bird.style.left = x + 'px';
            bird.style.top = y + 'px';
            setTimeout(this.fly.bind(this), parseInt(this.time));

        } else {

            bird.setAttribute('data-log', 1);
            let tempId = this.picter;


            setTimeout(function() {

                bird.style.display = 'block';
                bird.style.backgroundImage = 'url(' + tempId + ')';
                bird.style.backgroundSize = 'contain';
            }, 1000);

            setTimeout(this.fly.bind(this), parseInt(this.time));
        };

    };


    boom() {
        let el = document.getElementById(this.name);
        let shutout1 = this.point;

        el.addEventListener('click', function() {
            el.setAttribute('data-log', 0);
            shotIn++;
            score += shutout1;
            document.getElementById('score').innerHTML = 'You score: ' + score;
            document.getElementById('shotIn').innerHTML = 'Попаданий в цель: ' + shotIn;

            localStorage.setItem('score', score);
            localStorage.setItem('shotIn', shotIn);

            // при попадании(клике) фон заменяется на взрыв                       
            el.style.background = 'url(./images/bang.png)no-repeat';
            el.style.backgroundSize = 'contain';

            // количество points за попадание появляется при клике на птичке
            let pointEl = el.appendChild(document.createElement('span'));
            pointEl.innerHTML = shutout1;

            pointEl.setAttribute('class', 'pointBird');
            //исчезает взрыв и points           
            setTimeout(function() {
                pointEl.style.display = 'none';
                el.style.display = 'none';
            }, 300);
        });

    };

};

class timer {
    constructor(time) {
        this.time = time;
        this.timerEl = '';
    };

    displayTimer() {
        this.timerEl = wrap.appendChild(document.createElement('div'));
        this.timerEl.setAttribute('id', 'time');
        this.timers();
    };

    timers() {
        if (this.time >= 10) {
            this.timerEl.innerHTML = `Время: ${this.time--}`;
        } else {
            this.timerEl.innerHTML = `Время: 0${this.time--}`;


        };

        if (this.time != 0) {
            let q = setTimeout(this.timers.bind(this), 1000);
        } else {
            this.timerEl.innerHTML = `Время: 00`;

//визуальное оформление результатов игры после окончания времени
            setTimeout(function() {

                let y = document.getElementById('wrap').remove();
                let over = document.body.appendChild(document.createElement('div'));
                let buttonRefresh = document.body.appendChild(document.createElement('button'));
                let buttonMain = document.body.appendChild(document.createElement('button'));

                buttonMain.setAttribute('id', 'menu');
                buttonMain.innerHTML = 'На главную';

                over.setAttribute('id', 'end');
                
                buttonRefresh.setAttribute('id', 'refresh');
//табличка результатов
                let pEl = over.appendChild(document.createElement('p'));
                pEl.innerHTML = 'GAME OVER <br> You Score: ' + localStorage.getItem('score') +
                    '<br> Попаданий в цель: ' + localStorage.getItem('shotIn') +
                    '<br> Выстрелов мимо цели: ' + localStorage.getItem('shotOut');
//фон изменяется в зависимости от результатов игры
                if(parseInt(localStorage.getItem('score'))<=0){
                    over.setAttribute('style','background-image:url(./images/lose.jpg);');
                     pEl.style.display = 'none';
                     buttonRefresh.style.left = '2%';                           
                     buttonRefresh.style.top = '40%';                           
                     buttonMain.style.left = '75%';                           
                     buttonMain.style.top = '50%';                           
                }else{ over.setAttribute('style','background-image:url(./images/win.jpg);');};              

//события кнопок играть и на главную
                buttonRefresh.addEventListener('click', function() {
                    clearLocal();
                    location.reload();
                });

                buttonMain.addEventListener('click', function() {
                    window.location = 'index.html';
                });

            }, 1500);


        };

    };

};

function clearLocal(){
    localStorage.clear();
                    localStorage.setItem('score', 0);
                    localStorage.setItem('shotIn', 0);
                    localStorage.setItem('shotOut', 0);
};



clearLocal();
let wrap = document.getElementById('wrap');

let score = 0;
let shotIn = 0;
let shotOut = 0;

wrap.addEventListener('click', function() {

    if (event.target.getAttribute('data-wrap') == 'wrap') {
        let bullit = wrap.appendChild(document.createElement('div'));
        bullit.setAttribute('class', 'bullit');
        bullit.setAttribute('style', 'width:50px;height:50px;background-image: url(./images/pulya.png);background-repeat:no-repeat;background-size:cover;position:absolute; left:' +
            (event.pageX - 15) + 'px; top:' + (event.pageY - 10) + 'px;');
        shotOut++;
        document.getElementById('shotOut').innerHTML = 'Промах: ' + shotOut;
        localStorage.setItem('shotOut', shotOut);
    }

});


let mainWidth = wrap.clientWidth;
let mainHeight = wrap.clientHeight;




let bird20 = new birds('./images/bird_20_points.png', 114, 106, 1500, 'bird20', 20);
bird20.displayBirds();

let bird10 = new birds('./images/bird_10_points.png', 92, 123, 1300, 'bird10', 10);
bird10.displayBirds();

let pig = new birds('./images/pig_minus_100_points.png', 126, 120, 2000, 'pig', -50);
pig.displayBirds();

let bird50 = new birds('./images/bird_50_points.png', 80, 62, 1800, 'bird50', 50);
bird50.displayBirds();

let bird201 = new birds('./images/bird_20_points.png', 114, 106, 1400, 'bird201', 20);
bird201.displayBirds();

let bird10two = new birds('./images/bird_10_points.png', 92, 123, 900, 'bird10two', 10);
bird10two.displayBirds();

let bird50two = new birds('./images/bird_50_points.png', 80, 62, 1500, 'bird50two', 50);
bird50two.displayBirds();

let pigTwo = new birds('./images/pig_minus_100_points.png', 126, 120, 1300, 'pigTwo', -50);
pigTwo.displayBirds();

let timers = new timer(30);
timers.displayTimer();

