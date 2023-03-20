(() => {
    const $ = document.querySelector.bind(document);
    
    let timer = 1000;
    let isRotating = false;
    let currentRotate = 0;
    const nhac = document.getElementById('nhac');
    const soundC = document.getElementById('sound-clap');
    const wheel = $('.wheel');
    const btnStart = $('.logo1');
    const msg = $('.msg');

    const listGift = [
        {
            txtName: 'Voucher 200k',
            percent: 25.5/100
        },
        {
            txtName: 'Mua 1 tặng 1 <br> American Gimseng</br>',
            percent: 8.9/100
        },
        {
            txtName: 'Voucher hoàn tiền 50k',
            percent: 25.5/100
        },
        {
            txtName: '1 lon Kombucha',
            percent: 4/100
        },
        {
            txtName: 'Voucher hoàn tiền 100k',
            percent: 25.5/100
        },
        {
            txtName: 'Túi tote',
            percent: 4/100
        },
        
        {
            txtName: '1 thanh protein Bar Carman',
            percent: 4/100
        },
        {
            txtName: 'Mua hàng đồng giá',
            percent: 2.5/100
        },
        {
            txtName: 'Mua sản phẩm với giá 1k',
            percent: 0.1/100
        },
        {
            txtName: 'Máy lọc không khí',
            percent: 0/100
        },
    ];

    const size = listGift.length;
    const rotate = 360 / size; // số góc 1 phần quà
    const skewY = 90 - rotate; // độ nghiêng của items

    const renderItem = () => {
        listGift.forEach((item, index) => {
            const itemGift = document.createElement('li');

            itemGift.style.transform = `
                rotate(${rotate * index}deg)
                skewY(-${skewY}deg)
            `;

            itemGift.innerHTML = `
                <p class= "text-item ${index % 2 == 0 && 'even'}"
                style = "transform: skewY(${skewY}deg)
                    rotate(${rotate/2}deg)">
                    <span id="rotate">${item.txtName}</span>
                </p>
            `;
            wheel.appendChild(itemGift);
        });
    };

    const rotateWheel = (currentRotate,index) => {
        wheel.style.transform = `rotate(${
            currentRotate - index * rotate - rotate / 2
        }deg)`;
    };
    
    const getGift = randomNumber => {
        let currentPercent = 0;
        let list = [];

        listGift.forEach((item,index) => {
            currentPercent += item.percent;

            randomNumber <= currentPercent && list.push({
                ...item, index,
            });
        });

        return list [0];
    };


    /*const showTxtGift = (txt) => {
        setTimeout( ()=> {
            isRotating = false;
            msg.innerHTML = `Chúc mừng bạn đã trúng: ${txt}`;
        },timer);
        
    }
    /*const start = () => {
        isRotating = true;
        msg.innerHTML = '';
        const random = Math.random();
        const gift = getGift (random);

        console.log(gift);
        currentRotate += 360*10;
        rotateWheel(currentRotate, gift.index);
        showTxtGift(gift.txtName);
    };*/
    const start = () => {
        isRotating = true;
        msg.innerHTML = '';
        const random = Math.random();
        const gift = getGift (random);

        console.log(gift);
        currentRotate += 360*300;
        rotateWheel(currentRotate, gift.index);
        const trans = document.getElementById('wheel1');
        trans.addEventListener('transitionend', () => {
            setTimeout(() => {
                isRotating = false;
                const popup = document.getElementById("popup-container");
                popup.style.display = "block";
                msg.innerHTML = gift.txtName;
                nhac.pause();
                soundC.play();
            },timer);
            
        });
        
    };
    
    btnStart.addEventListener('click', () => {
        !isRotating && start();
        nhac.currentTime = 0;
        nhac.play();
    })

    renderItem();
})();