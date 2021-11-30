import Phaser from 'phaser'
import { DE_DE, EN_US, ES_AR, PT_BR } from '../enums/languages'
import { FETCHED, FETCHING, READY, TODO } from '../enums/status'
import { getTranslations, getPhrase, adaptTranslations } from '../services/translations'
//import { words }  from 'tr.json' 

const words = {"words":[{"key":"TestPhrase","translate":"*You get the text from the API, but its not really that useful...","id":"ckvh78lfu05861g3f39tjm45b"},{"key":"Play","translate":"Play","id":"ckvhrqoax18711nyg2v42yfkz"},{"key":"Fact2","translate":"Did you know? \nA good chunk of fires are caused by intentionally burning grass","id":"ckvobr0m73810501nx8oktpmi9p"},{"key":"Options","translate":"Options","id":"ckvljmg2412881pvnulq9q71d"},{"key":"Levels","translate":"Levels","id":"ckvljolxx26221pvnknwfs3ib"},{"key":"Pause","translate":"Pause","id":"ckvljpdpp32651pvn08gme7ga"},{"key":"Retry","translate":"Retry","id":"ckvljqfe139221pvnk65j52ur"},{"key":"Continue","translate":"Continue","id":"ckvljsh6p45931pvnmt3k00ef"},{"key":"Credits","translate":"Credits","id":"ckvljtdg552781pvndulhl8td"},{"key":"Win","translate":"You Win!","id":"ckvljucvd59771pvnrfdwmcyb"},{"key":"Hint1","translate":"Low on water? Just pick up a water bottle!","id":"ckvps2yag667981kyfw1zrb8ac"},{"key":"Hint3","translate":"Remember: You can aim while shooting","id":"ckvpsh11g686041kyfdpu5t3jx"},{"key":"Fact1","translate":"Did you know? Sometimes, Game hints\ncan appear here, so keep your eyes open, else you'll miss them!","id":"ckvprqy71646531kyfedz2td1m"},{"key":"Hint2","translate":"Position yourself efficiently \nso you can cover more space with a single shot!","id":"ckvps5od4677371kyfqz8pxmgi"},{"key":"Fact3","translate":"Did you know? \nYou can see fire statistics in the region via \nNASA FIRMS\n(To see them, just copy this link)\nhttps://firms.modaps.eosdis.nasa.gov/\nmap/#t:adv;d:2020-07-16..2020-07-17;\n@-59.3,-31.9,7z \n","id":"ckvoc8i334004811nx8wkd6lxzg"},{"key":"Hint","translate":"Hint!","id":"ckvpuuaos1231431kyfjhb5l12p"},{"key":"Fact","translate":"Fact!","id":"ckvpuv9zb1235701kyfpzjtabtu"}]}
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
    //this.getTranslations(ES_AR)
}
preload()
{
    this.load.audio('los', 'assets/SFX/derrota.wav')
    this.load.audio('vic', 'assets/SFX/victoria.wav')
    this.load.audio('adv','assets/SFX/advanced.wav')
    this.load.audio('waters','assets/SFX/shooting.wav')
    this.load.audio('pwup', 'assets/SFX/powerups.wav')

    this.load.image('himg1', 'assets/Menu/IconoAgua.png')
    this.load.image('Hbutt', 'assets/Menu/button.png')
    this.load.image('box','assets/Menu/TextBox.png')
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
{//console.log(this.gif.anims.getProgress())
    
    
    
    if(this.wasChangedLanguage === FETCHED){
        this.wasChangedLanguage = READY;
    }

    if (this.gif.anims.getProgress() == 1)
    {
        localStorage.setItem('translations', adaptTranslations(this.cache.json.get('spa')));
        this.time.delayedCall(1100,() => this.scene.start('menu'))
    }
}

async getTranslations(language){
    this.wasChangedLanguage = FETCHING
    await getTranslations(language)
    this.wasChangedLanguage = FETCHED
}
}