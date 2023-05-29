/* eslint-disable no-mixed-operators */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
import {
  Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from 'src/app/globals';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  themes: any[] = [{
    title: 'Bright Gray', value: 'Green', primary: '#30d493', secoundry: '#ffffff', checked: true,
  },
  {
    title: 'Shadow Blue', value: 'Blue', primary: '#193482', secoundry: '#ffffff', checked: false,
  },
  {
    title: 'Killar Grey', value: 'Grey', primary: '#0f2738', secoundry: '#97a4b3', checked: false,
  },
  {
    title: 'Vintage Wind ', value: 'KillarStyle', primary: '#3d5a80', secoundry: '#98c1d9', checked: false,
  },
  {
    title: 'Winter Lime ', value: 'lime', primary: '#434738', secoundry: '#cfe2a4', checked: false,
  },
  ]

  gCmplogo = '';

  @Input() Titleheader: String;

  @Input() back: String;

  constructor(public globals: Globals, public router : Router, private location: Location) {
    this.gCmplogo = this.globals.gCmplogo;
  }

  ngOnInit(): void {
    this.globals.showAnimi = false;
    const index = localStorage.getItem('setThemeIndex') || '0';
    this.changeTheme('e', index, this.themes[index]);
    if (this.globals.showAnimi) {
      setTimeout(() => {
        this.makeItConfetti();
      }, 10);
    }
  }

  changeTheme(event: any, i: any, theme: any) {
    for (let index = 0; index < this.themes.length; index++) {
      this.themes[index].checked = false;
    }
    // console.log(this.themes[i]);

    this.themes[i].checked = true;
    localStorage.setItem('setThemeIndex', i);
    document.scrollingElement.setAttribute('data-theme', theme.value);
    // console.log(document.scrollingElement.getAttribute('data-theme'));
  }

  @Output() public BackClick = new EventEmitter<any>();

  backClick() {
    if (this.back === 'true') {
      this.BackClick.emit();
    } else {
      this.location.back();
      // this.router.navigateByUrl('/dashboard');
    }
  }

   confettiPlayers = [];

   Nmber(qty) {
     return new Array(qty);
   }

   makeItConfetti() {
     this.globals.showAnimi = true;
     const confetti = document.querySelectorAll('.confetti');
     for (let i = 0, len = confetti.length; i < len; ++i) {
       const snowball = confetti[i];
       snowball.innerHTML = '<div class="rotate"><div class="askew"></div></div>';
       const scale = Math.random() * 0.8 + 0.2;
       const player = snowball.animate([
         { transform: `translate3d(${i / len * 100}vw,0,0) scale(${scale})`, opacity: scale },
         { transform: `translate3d(${i / len * 100 + 10}vw,100vh,0) scale(${scale})`, opacity: 1 },
       ], {
         duration: Math.random() * 3 + 3000,
         iterations: 2,
         delay: -(Math.random() * 5000),
       });

       this.confettiPlayers.push(player);
     }
     setTimeout(() => {
       this.globals.showAnimi = false;
     }, 4500);
   }
}
