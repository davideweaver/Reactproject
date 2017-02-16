let rnd = 0;
export default function randomImage() {
    //let rnd = Math.floor(Math.random() * 7) + 1;
    rnd++;
    if (rnd > 7)
        rnd = 1;
    switch (rnd) {
        case 1: return require("../../assets/f8photos/1.jpg");
        case 2: return require("../../assets/f8photos/2.jpg");
        case 3: return require("../../assets/f8photos/3.jpg");
        case 4: return require("../../assets/f8photos/4.jpg");
        case 5: return require("../../assets/f8photos/5.jpg");
        case 6: return require("../../assets/f8photos/6.jpg");
        case 7: return require("../../assets/f8photos/7.jpg");
    }
}