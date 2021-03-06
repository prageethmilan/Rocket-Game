$(window).on('load',function () {
    var sfx = {
        shuttle: new Howl({
            src: ['assets/sound/SpaceShuttle.mp3'],
            loop: true
        }),
        move: new Howl({
            src: ['https://assets.codepen.io/21542/howler-push.mp3',
            ]
        })
    }

    sfx.shuttle.play();

    let rocket = document.getElementById("rocket");
    let background = document.getElementById("background");

    window.addEventListener('keydown', function (e) {
        var left = parseInt(window.getComputedStyle(rocket).getPropertyValue("left"));
        if (e.key == "ArrowLeft" && left > 0) {
            rocket.style.left = left - 10 + "px";
        } else if (e.key == "ArrowRight" && left <= 948) {
            rocket.style.left = left + 10 + "px";
        }

        if (e.key == "ArrowUp" || e.keyCode == 32) {
            var bullet = document.createElement("div");
            sfx.move.play();
            bullet.classList.add("bullets");
            background.appendChild(bullet);

            var moveBullet = setInterval(() => {

                var asteroids = document.getElementsByClassName("asteroids");
                for (var i = 0; i < asteroids.length; i++) {
                    var asteroid = asteroids[i];
                    var asteroidBound = asteroid.getBoundingClientRect();
                    var bulletBound = bullet.getBoundingClientRect();

                    if (bulletBound.left >= asteroidBound.left &&
                        bulletBound.right <= asteroidBound.right &&
                        bulletBound.top <= asteroidBound.top &&
                        bulletBound.bottom <= asteroidBound.bottom) {
                        asteroid.parentElement.removeChild(asteroid);

                        document.getElementById("scoreCard").innerHTML = parseInt(document.getElementById("scoreCard").innerHTML) + 1;

                    }
                }

                var bulletBottom = parseInt(window.getComputedStyle(bullet).getPropertyValue("bottom"));

                if (bulletBottom >= 650) {
                    clearInterval(moveBullet);
                }

                bullet.style.left = left + "px";
                bullet.style.bottom = bulletBottom + 5 + "px";
            });
        }
    });

    var rocks = setInterval(() => {
        var asteroid = document.createElement("div");
        asteroid.classList.add("asteroids");
        var asteroidLeft = parseInt(window.getComputedStyle(asteroid).getPropertyValue("left"));
        asteroid.style.left = Math.floor(Math.random() * 930) + "px";
        background.appendChild(asteroid);
    }, 1500);

    var moveAsteroids = setInterval(() => {
        var asteroids = document.getElementsByClassName("asteroids");
        if (asteroids != undefined) {
            for (var i = 0; i < asteroids.length; i++) {
                var asteroid = asteroids[i];
                var asteroidTop = parseInt(window.getComputedStyle(asteroid).getPropertyValue("top"));
                if (asteroidTop >= 600) {
                    let score = $("#scoreCard").text();
                    sfx.shuttle.stop();
                    swal({
                        title: "Warning",
                        text: "Game Over. Your Score is " + score,
                        icon: "warning",
                        button: "Close",
                    });
                    $("#btnStart").css('display', 'block');
                    clearInterval(moveAsteroids);
                    clearInterval(rocks);
                }
                asteroid.style.top = asteroidTop + 15 + "px";
            }
        }
    }, 250);

    $("#btnStart").click(function () {
        window.location.reload();
    });
});


/*
var sfx = {
    move: new Howl({
        src: ['https://assets.codepen.io/21542/howler-push.mp3',
        ]
    }),
    shuttle: new Howl({
        src: ['assets/sound/SpaceShuttle.mp3'],
        loop: true
    })
}*/
