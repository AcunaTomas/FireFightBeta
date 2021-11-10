//Ugly menu code, podria rehacerlo, pero no tengo tiempo, por lo menos funciona


import Phaser from 'phaser'
import { DE_DE, EN_US, ES_AR, PT_BR } from '../enums/languages'
import { FETCHED, FETCHING, READY, TODO } from '../enums/status'
import { getTranslations, getPhrase } from '../services/translations'
export default class HelloWorldScene extends Phaser.Scene
{
    //Interface code -
    private lvlback
    private men
    private dad 
    private ded
    private mtxt
    private datxt
    private detxt
    private txt1
    private txt2
    private txt3
    private txt4
    private txt5
    private txtback

    //Translation strings - Shameless Copypasta
    private spanish
    private english

    private updatedTextInScene
    private updatedString = 'Siguiente'
    private wasChangedLanguage = TODO


	constructor()
	{
		super('menu')
	}
    preload()
    {

    }
    create()
    {  
        this.sound.stopAll()
        this.sound.play('mus')
        this.add.image(1280/2,720/2, 'tback')
        this.add.image(650,100, 'tlogo')
        this.add.image(640,460, 'base')
        this.men = this.add.image(670,345, 'play')
        this.dad = this.add.image(660,445, 'levels')
        this.ded = this.add.image(655,543, 'options')
        this.mtxt =  this.add.text(600, 325, getPhrase('Play'), { fontFamily:'Wood', fontSize: '72px', fill: '#663300' })
        this.datxt =  this.add.text(600, 425, getPhrase('Levels'), { fontFamily:'Wood', fontSize: '72px', fill: '#663300' })
        this.detxt =  this.add.text(600, 527, getPhrase('Options'), { fontFamily:'Wood', fontSize: '72px', fill: '#663300' })
        this.lvlback = this.add.image(650,250, 'lvlscr')
        this.txt1 = this.add.text(480, 160, '1', { fontFamily:'Wood', fontSize: '72px', fill: '#FFF' })
        this.txt2 = this.add.text(640, 200, '2', { fontFamily:'Wood', fontSize: '72px', fill: '#FFF' })
        this.txt3 = this.add.text(780, 160, '3', { fontFamily:'Wood', fontSize: '72px', fill: '#FFF' })
        this.txt4 = this.add.text(530, 320, '4', { fontFamily:'Wood', fontSize: '72px', fill: '#FFF' })
        this.txt5 = this.add.text(720, 320, '5', { fontFamily:'Wood', fontSize: '72px', fill: '#FFF' })
        this.txtback = this.add.text(580, 420, 'Atras', { fontFamily:'Wood', fontSize: '72px', fill: '#663300' })
        this.txt1.setVisible(false).setInteractive()
        this.txt2.setVisible(false).setInteractive()
        this.txt3.setVisible(false).setInteractive()
        this.txt4.setVisible(false).setInteractive()
        this.txt5.setVisible(false).setInteractive()
        this.txtback.setVisible(false).setInteractive()
        this.lvlback.setVisible(false)
        this.men.setInteractive()
        this.dad.setInteractive()
        this.ded.setInteractive() 
        
        this.txt1.on('pointerdown', () => this.scene.start('hello-world',{s:1}))
        this.txt2.on('pointerdown', () => this.scene.start('hello-world',{s:2}))
        this.txt3.on('pointerdown', () => this.scene.start('hello-world',{s:3}))
        this.txt4.on('pointerdown', () => this.scene.start('hello-world',{s:4}))
        this.txt5.on('pointerdown', () => this.scene.start('hello-world',{s:5}))
        this.txtback.on('pointerdown', this.hidelvl, this)
        this.men.on('pointerdown', this.play, this);
        this.dad.on('pointerdown', this.levels, this);
        this.ded.on('pointerdown', this.options, this);


    }

    update()
    {
        if(this.wasChangedLanguage === FETCHED){
            this.wasChangedLanguage = READY;
            //this.updatedTextInScene.setText(getPhrase(this.updatedString));
        }
    }
    play()
    {
        this.scene.start('hello-world',{s:1})
    }
    options()
    {
        //this.scene.start('gover')
        this.getTranslations(EN_US)
    }
    levels()
    {
        this.lvlback.setVisible(true)
        this.men.removeInteractive()
        this.dad.removeInteractive()
        this.ded.removeInteractive()
        this.txt1.setVisible(true)
        this.txt2.setVisible(true)
        this.txt3.setVisible(true)
        this.txt4.setVisible(true)
        this.txt5.setVisible(true)
        this.txtback.setVisible(true)
    }

    hidelvl()
    {
        this.lvlback.setVisible(false)
        this.men.setInteractive()
        this.dad.setInteractive()
        this.ded.setInteractive()
        this.txt1.setVisible(false)
        this.txt2.setVisible(false)
        this.txt3.setVisible(false)
        this.txt4.setVisible(false)
        this.txt5.setVisible(false)
        this.txtback.setVisible(false)
    }
    async getTranslations(language){
        this.wasChangedLanguage = FETCHING
        await getTranslations(language)
        this.wasChangedLanguage = FETCHED
        // si solo se tiene un menu para elegir las opciones de idiomas conviene cargar aca la misma
        // this.scene.start('play')
    }
}


