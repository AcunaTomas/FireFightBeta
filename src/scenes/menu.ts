//Ugly menu code, podria rehacerlo, pero no tengo tiempo, por lo menos funciona


import Phaser from 'phaser'
import { DE_DE, EN_US, ES_AR, PT_BR } from '../enums/languages'
import { FETCHED, FETCHING, READY, TODO } from '../enums/status'
import { getTranslations, getPhrase, adaptTranslations } from '../services/translations'
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
    private backimg
    private box
    private langtxt
    private langbtn
    private desclang
    private obacktxt
    private helptxt1
    private helptxt2
    private helptxt3
    private helptxt4
    private helpbtn
    private himg1
    private himg2

    private ling
    private sbtn
    private stxt
    private sbtntxt

    private hvisible

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
        this.ling = getPhrase('Language')
        this.hvisible = false
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
        this.txtback = this.add.text(580, 420, getPhrase('Back'), { fontFamily:'Wood', fontSize: '72px', fill: '#663300' })
        this.box = this.add.image(640, 360, 'box').setVisible(false).setScale(2.0)
        this.langbtn = this.add.image(750, 140, 'Hbutt').setVisible(false)
        this.helpbtn = this.add.image(500, 560, 'Hbutt').setVisible(false)
        this.langtxt = this.add.text(700,110,getPhrase('Language'), {fontFamily:'Wood', fontSize:'72px', fill: '#cc3300'}).setVisible(false)
        this.backimg = this.add.image(850,560,'Hbutt').setVisible(false).setInteractive()
        this.obacktxt = this.add.text(800,530,getPhrase('Back'), {fontFamily:'Wood', fontSize:'72px', fill: '#cc3300'}).setVisible(false)
        this.desclang = this.add.text(350,110,getPhrase('lang'), {fontFamily:'Wood', fontSize:'72px', fill: '#cc3300'}).setVisible(false)
        this.helptxt1 = this.add.text(460,530,getPhrase('Help'), {fontFamily:'Wood', fontSize:'72px', fill: '#cc3300'}).setVisible(false)
        this.helptxt2 = this.add.text(250,100,getPhrase('Help1'), {fontSize:'24px', fill: '#FFFFFF'}).setVisible(false)
        this.helptxt3 = this.add.text(250,250,getPhrase('Help2'), {fontSize:'24px', fill: '#FFFFFF'}).setVisible(false)
        this.helptxt4 = this.add.text(250,350,getPhrase('Help3'), {fontSize:'24px', fill: '#FFFFFF'}).setVisible(false)
        this.himg1 = this.add.image(600,200,'himg1').setVisible(false).setScale(0.1)
        this.sbtn = this.add.image(750,280, 'Hbutt').setVisible(false)
        this.stxt = this.add.text(350,260,getPhrase('Sound'), {fontFamily:'Wood', fontSize:'72px', fill: '#cc3300'}).setVisible(false)
        this.sbtntxt = this.add.text(700,240,getPhrase('Yes'), {fontFamily:'Wood', fontSize:'72px', fill: '#cc3300'}).setVisible(false)

        this.langtxt.setInteractive()
        this.obacktxt.setInteractive()
        this.helpbtn.setInteractive()
        this.txt1.setVisible(false).setInteractive()
        this.txt2.setVisible(false).setInteractive()
        this.txt3.setVisible(false).setInteractive()
        this.txt4.setVisible(false).setInteractive()
        this.txt5.setVisible(false).setInteractive()
        this.sbtn.setInteractive()
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
        this.langtxt.on('pointerdown',this.chlng, this)
        this.backimg.on('pointerdown',this.hideoptions, this)
        this.obacktxt.on('pointerdown',this.hideoptions,this)
        this.helpbtn.on('pointerdown', this.helpshow, this)
        this.sbtn.on('pointerdown', this.snd, this)
    }

    update()
    {
        if(this.wasChangedLanguage === FETCHED){
            this.wasChangedLanguage = READY;
            
        }
    }
    play()
    {
        this.scene.start('hello-world',{s:1})
    }
    options()
    {
        this.box.setVisible(true)
        this.langbtn.setVisible(true)
        this.helpbtn.setVisible(true)
        this.langtxt.setVisible(true)
        this.obacktxt.setVisible(true)
        this.backimg.setVisible(true)
        this.desclang.setVisible(true)
        this.helptxt1.setVisible(true)
        this.sbtntxt.setVisible(true)
        this.stxt.setVisible(true)
        this.sbtn.setVisible(true)
        this.men.removeInteractive()
        this.dad.removeInteractive()
        this.ded.removeInteractive()
    }
    helpshow()
    {
        if (this.hvisible  == false)
        {
            this.langbtn.setVisible(false)
            this.langtxt.setVisible(false)
            this.obacktxt.setVisible(false)
            this.desclang.setVisible(false)
            this.stxt.setVisible(false)
            this.sbtn.setVisible(false)
            this.backimg.setVisible(false)
            this.sbtntxt.setVisible(false)
            this.helptxt2.setVisible(true)
            this.helptxt3.setVisible(true)
            this.helptxt4.setVisible(true)
            this.himg1.setVisible(true)
            this.helptxt1.setText(getPhrase('Back'))
            
            this.hvisible = true
        }
        else
        {
            this.langbtn.setVisible(true)
            this.langtxt.setVisible(true)
            this.obacktxt.setVisible(true)
            this.desclang.setVisible(true)
            this.stxt.setVisible(true)
            this.sbtn.setVisible(true)
            this.sbtntxt.setVisible(true)
            this.backimg.setVisible(true)
            this.helptxt1.setText(getPhrase('Help'))
            this.helptxt2.setVisible(false)
            this.helptxt3.setVisible(false)
            this.helptxt4.setVisible(false)
            this.himg1.setVisible(false)
            this.hvisible = false
        }

    }

    hideoptions()
    {
        this.box.setVisible(false)
        this.langbtn.setVisible(false)
        this.helpbtn.setVisible(false)
        this.langtxt.setVisible(false)
        this.helptxt1.setVisible(false)
        this.obacktxt.setVisible(false)
        this.desclang.setVisible(false)
        this.backimg.setVisible(false)
        this.stxt.setVisible(false)
        this.sbtntxt.setVisible(false)
        this.sbtn.setVisible(false)
        this.men.setInteractive()
        this.dad.setInteractive()
        this.ded.setInteractive()
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
        this.scene.restart()
    }

    chlng()
    {
        if (this.ling == 'Español')
        {
            localStorage.clear()
            //this.getTranslations(EN_US)
            adaptTranslations(this.cache.json.get('eng'))
            this.ling = 'English'
            this.langtxt.setText(getPhrase('Language'))
        }
        else if (this.ling == 'English')
        {
            localStorage.clear()
            //this.getTranslations(ES_AR)
            adaptTranslations(this.cache.json.get('spa'))
            this.ling = 'Español'
            this.langtxt.setText(getPhrase('Language'))
        }
        ///else if (this.ling == 'Português')
        //{
       //     localStorage.clear()
       //     this.getTranslations(ES_AR)
       //     this.ling = 'Español'
       //     this.langtxt.setText(getPhrase('Language'))
       // }

    }

    snd()
    {
        if (this.sound.mute == false)
        {
            this.sound.mute = true
            this.sbtntxt.setText('No')
        }
        else
        {
            this.sound.mute = false
            this.sbtntxt.setText(getPhrase('Yes'))
        }
    }
}


