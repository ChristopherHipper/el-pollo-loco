class Character extends MovableObject {
    x = 0;
    y = 300;
    width = 150;
    height = 100;
    keys = [];
    constructor(x, y, width, height) {
        super(x, y, width, height).loadImage('../assets/img/2_character_pepe/1_idle/idle/I-1.png');
        this.moveCharacter();
    }
    moveCharacter() {
        window.addEventListener('keydown', (e) => {
            if ((e.key === 'ArrowRight' || e.key ==='ArrowLeft')
                && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
            }
            console.log(e.key, this.keys);
            
        });
        window.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
            console.log(e.key, this.keys);
        });
    }
    updateCharacterPosition() {
        if (this.keys.includes('ArrowRight')) {
            this.x ++
        }   else if (this.keys.includes('ArrowLeft')) {
            this.x --
        }
}
    jump() { }
    sleep() { }
    throw() { }
}