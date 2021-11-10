import Phaser from 'phaser'
import { DE_DE, EN_US, ES_AR, PT_BR } from '../enums/languages'
import { FETCHED, FETCHING, READY, TODO } from '../enums/status'
import { getTranslations, getPhrase } from '../services/translations'
export default class actualpreloader extends Phaser.Scene
{
//Translation strings - Shameless Copypasta
private spanish
private english

private updatedTextInScene
private updatedString = 'Siguiente'
private wasChangedLanguage = TODO
private d
private gif
private loadtr
private enabletr
constructor()
{
    super('actualpreloader')
    this.d = {}
    this.loadtr = false
    this.enabletr = true
}
init()
{
    this.d = 
    {key: 'r',
    frames: [
        {key: '1'},
        {key: '2'},
        {key: '3'},
        {key: '4'},
        {key: '5'},
        {key: '6'},
        {key: '7'},
        {key: '8'},
        {key: '9'},
        {key: '10'},
        {key: '11'},
        {key: '12'},
        {key: '13'},
        {key: '14'},
        {key: '15'},
        {key: '16'},
        {key: '17'},
        {key: '18'},
        {key: '19'},
        {key: '20'},
        {key: '21'},
        {key: '22'},
        {key: '23'},
        {key: '24'},
        {key: '25'},
        {key: '26'},
        {key: '27'},
        {key: '28'},
        {key: '29'},
        {key: '30'},
        {key: '31'},
        {key: '32'},
        {key: '33'},
        {key: '34'},
        {key: '35'},
        {key: '36'},
        {key: '37'},
        {key: '38'},
        {key: '39'},
    ]
    ,
    frameRate: 15,
    repeat: 0}
    this.anims.create(this.d);
    var a = this.add.graphics()

    a.fillStyle(0xffffff, 1)
    a.fillRect(0,0,1280,720)
    this.gif = this.add.sprite(640, 360, '0').play('r');
}
preload()
{


    this.load.image('menu1', "assets/Menu/Options1.png")
    this.load.image('tback', 'assets/Menu/LogoVacio.png')
    this.load.image('tlogo', 'assets/Menu/LogoTitulo.png')
    this.load.image('base', "assets/Menu/base con agarradera.png")
    this.load.image('chain', "assets/Menu/CADENA1.png")
    this.load.image('play', "assets/Menu/jugar.png")
    this.load.image('levels', "assets/Menu/niveles.png")
    this.load.image('options', "assets/Menu/opciones.png")
    this.load.image('prope', 'assets/Menu/prope.png')
    this.load.audio('game', 'assets/SFX/gametest.wav')
    this.load.audio('pstep', 'assets/SFX/step.wav')
    this.load.audio('mus', 'assets/SFX/menu.wav')
    this.load.image('lvlscr','assets/Menu/LvlSelect.png')
}
update()
{console.log(this.gif.anims.getProgress())
    if (this.gif.anims.getProgress() == 1)
    {
        this.loadtr = true
        if (this.loadtr && this.enabletr)
        {
        this.getTranslations(EN_US)
        //this.time.delayedCall(3000,() => this.scene.start('menu'))  
        this.enabletr = false
        }

    }
    if(this.wasChangedLanguage === FETCHED){
        this.wasChangedLanguage = READY;
        this.scene.start('menu')
    }
}

async getTranslations(language){
    this.wasChangedLanguage = FETCHING
    await getTranslations(language)
    this.wasChangedLanguage = FETCHED
}
}