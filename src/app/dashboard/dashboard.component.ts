/* eslint-disable no-param-reassign */
/* eslint-disable default-case */
/* eslint-disable max-len */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/no-unresolved */
import {
  Component, ElementRef, OnInit, ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from 'src/app/globals';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';
import * as pdfjsLib from 'pdfjs-dist';

import { murgnService } from '../services/murgn.service';
import { debounceTime } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  private subs = new SubSink();

  searchInput:string = '';

  arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  // SQl Traning | 1-jan-2000 |  30-jan-2000
  // 15-jan-2000 20-feb-2000  fromDate <= userFromDate or toDate >= userFromDate and fromDate <= userToDate or toDate >= userToDate

  viewMoreLoad = true

  myControl = new FormControl();

  constructor(
private global: Globals,
    private router: Router,
    private mService: murgnService,
  ) {

  }

player1 = true;

selectedArr = []

btnClick(col) {
  if (this.player1) {
    const btn:any = document.getElementById(col);
    btn.style.backgroundColor = '#000';
    btn.disabled = true;
    btn.value = 'player1';
    btn.name = 'player1';
    this.player1 = !this.player1;
    this.selectedArr.push(col);
    this.checkWinCondition(1, col);
  } else {
    const btn:any = document.getElementById(col);
    btn.style.backgroundColor = '#ff0000';
    btn.disabled = true;
    btn.value = 'player2';
    btn.name = 'player2';
    this.player1 = !this.player1;
    this.selectedArr.push(col);
    this.checkWinCondition(2, col);
  }
}

p1Arr =[]

p2Arr =[];

reset() {
  const btn:any = document.querySelectorAll('.tick');
  // console.log(btn);

  btn.forEach((element:any) => {
    element.disabled = false;
    element.value = '';
    element.name = '';
    element.style.backgroundColor = '#fff';
  });
  this.player1 = true;

  this.selectedArr = [];

  this.p1Arr = [];
  this.p2Arr = [];
}

checkWinCondition(player, col) {
  if (this.selectedArr.length > 4) {
    const grid:any = document.getElementsByClassName('gNormalButton');
    this.p1Arr = [];
    this.p2Arr = [];

    for (let index = 0; index < grid.length; index++) {
      const element = grid[index];
      if (element.value === 'player1') {
        this.p1Arr.push(Number(element.id));
      } else if (element.value === 'player2') {
        this.p2Arr.push(Number(element.id));
      }
    }
    if (this.selectedArr.length === this.arr.length) {
      Swal.fire({ text: 'Match Draw' });
      // this.reset();
      return;
    }


    if (this.p1Arr.length > 2 || this.p2Arr.length > 2) {
      switch (col) {
        case 1:

          if ((this.p1Arr.includes(1) && this.p1Arr.includes(2) && this.p1Arr.includes(3))
        || (this.p1Arr.includes(1) && this.p1Arr.includes(4) && this.p1Arr.includes(7))
        || (this.p1Arr.includes(1) && this.p1Arr.includes(5) && this.p1Arr.includes(9))) {
            Swal.fire({ text: 'player1 Wins' });
            // this.reset();
          } else if ((this.p2Arr.includes(1) && this.p2Arr.includes(2) && this.p2Arr.includes(3))
        || (this.p2Arr.includes(1) && this.p2Arr.includes(4) && this.p2Arr.includes(7))
        || (this.p2Arr.includes(1) && this.p2Arr.includes(5) && this.p2Arr.includes(9))) {
            Swal.fire({ text: 'player2 Wins' });
            // this.reset();
          }
          break;

        case 2:
          if (this.p1Arr.includes(2) && this.p1Arr.includes(5) && this.p1Arr.includes(8)) {
            Swal.fire({ text: 'player1 Wins' });
            // this.reset();
          } else if (this.p2Arr.includes(2) && this.p2Arr.includes(5) && this.p2Arr.includes(8)) {
            Swal.fire({ text: 'player2 Wins' });
            // this.reset();
          }
          break;
        case 3:
          if ((this.p1Arr.includes(3) && this.p1Arr.includes(2) && this.p1Arr.includes(1))
          || (this.p1Arr.includes(3) && this.p1Arr.includes(5) && this.p1Arr.includes(7))
          || (this.p1Arr.includes(3) && this.p1Arr.includes(6) && this.p1Arr.includes(9))) {
            Swal.fire({ text: 'player1 Wins' });
            // this.reset();
          } else if ((this.p2Arr.includes(3) && this.p2Arr.includes(2) && this.p2Arr.includes(1))
          || (this.p2Arr.includes(3) && this.p2Arr.includes(5) && this.p2Arr.includes(7))
          || (this.p2Arr.includes(3) && this.p2Arr.includes(6) && this.p2Arr.includes(9))) {
            Swal.fire({ text: 'player2 Wins' });
            // this.reset();
          }
          break;
        case 4:
          if (this.p1Arr.includes(4) && this.p1Arr.includes(5) && this.p1Arr.includes(6)) {
            Swal.fire({ text: 'player1 Wins' });
            // this.reset();
          } else if (this.p2Arr.includes(4) && this.p2Arr.includes(5) && this.p2Arr.includes(6)) {
            Swal.fire({ text: 'player2 Wins' });
            // this.reset();
          }
          break;
        case 5:
          if ((this.p1Arr.includes(1) && this.p1Arr.includes(5) && this.p1Arr.includes(9))
          || (this.p1Arr.includes(3) && this.p1Arr.includes(5) && this.p1Arr.includes(7))
          || (this.p1Arr.includes(4) && this.p1Arr.includes(5) && this.p1Arr.includes(6))
          || (this.p1Arr.includes(2) && this.p1Arr.includes(5) && this.p1Arr.includes(8))) {
            Swal.fire({ text: 'player1 Wins' });
            // this.reset();
          } else if ((this.p2Arr.includes(1) && this.p2Arr.includes(5) && this.p2Arr.includes(9))
          || (this.p2Arr.includes(3) && this.p2Arr.includes(5) && this.p2Arr.includes(7))
          || (this.p2Arr.includes(4) && this.p2Arr.includes(5) && this.p2Arr.includes(6))
          || (this.p2Arr.includes(2) && this.p2Arr.includes(5) && this.p2Arr.includes(8))) {
            Swal.fire({ text: 'player2 Wins' });
            // this.reset();
          }
          break;
        case 6:
          if ((this.p1Arr.includes(3) && this.p1Arr.includes(6) && this.p1Arr.includes(9))
          || (this.p1Arr.includes(4) && this.p1Arr.includes(5) && this.p1Arr.includes(6))) {
            Swal.fire({ text: 'player1 Wins' });
            // this.reset();
          } else if ((this.p2Arr.includes(3) && this.p2Arr.includes(6) && this.p2Arr.includes(9))
          || (this.p2Arr.includes(4) && this.p2Arr.includes(5) && this.p2Arr.includes(6))) {
            Swal.fire({ text: 'player2 Wins' });
            // this.reset();
          }
          break;
        case 7:
          if ((this.p1Arr.includes(1) && this.p1Arr.includes(4) && this.p1Arr.includes(7))
          || (this.p1Arr.includes(7) && this.p1Arr.includes(8) && this.p1Arr.includes(9))
          || (this.p1Arr.includes(3) && this.p1Arr.includes(5) && this.p1Arr.includes(7))) {
            Swal.fire({ text: 'player1 Wins' });
            // this.reset();
          } else if ((this.p2Arr.includes(1) && this.p2Arr.includes(4) && this.p2Arr.includes(7))
          || (this.p2Arr.includes(7) && this.p2Arr.includes(8) && this.p2Arr.includes(9))
          || (this.p2Arr.includes(3) && this.p2Arr.includes(5) && this.p2Arr.includes(7))) {
            Swal.fire({ text: 'player2 Wins' });
            // this.reset();
          }
          break;
        case 8:
          if ((this.p1Arr.includes(2) && this.p1Arr.includes(5) && this.p1Arr.includes(8))
          || (this.p1Arr.includes(7) && this.p1Arr.includes(8) && this.p1Arr.includes(9))) {
            Swal.fire({ text: 'player1 Wins' });
            // this.reset();
          } else if ((this.p2Arr.includes(2) && this.p2Arr.includes(5) && this.p2Arr.includes(8))
          || (this.p2Arr.includes(7) && this.p2Arr.includes(8) && this.p2Arr.includes(9))) {
            Swal.fire({ text: 'player2 Wins' });
            // this.reset();
          }
          break;
        case 9:
          if ((this.p1Arr.includes(1) && this.p1Arr.includes(5) && this.p1Arr.includes(9))
          || (this.p1Arr.includes(3) && this.p1Arr.includes(6) && this.p1Arr.includes(9))
          || (this.p1Arr.includes(7) && this.p1Arr.includes(8) && this.p1Arr.includes(9))) {
            Swal.fire({ text: 'player1 Wins' });
            // this.reset();
          } else if ((this.p2Arr.includes(1) && this.p2Arr.includes(5) && this.p2Arr.includes(9))
          || (this.p2Arr.includes(3) && this.p2Arr.includes(6) && this.p2Arr.includes(9))
          || (this.p2Arr.includes(7) && this.p2Arr.includes(8) && this.p2Arr.includes(9))) {
            Swal.fire({ text: 'player2 Wins' });
            // this.reset();
          }
          break;
      }
    }
  }
}

VAPID_PUBLIC_KEY = 'BPJz0E5NdqrgBNDYIHNEnu4MsObWYvOMRem0Ko8yMKC7rrc-lhjUya2qVl4xxQ_r2LxvzbgVII3vpH4yNhr1B9k';

SQL = [
  {
    name: 'person1',
    fromDate: 1,
    toDate: 14,
  },
  {
    name: 'person2',
    fromDate: 2,
    toDate: 15,
  }, {
    name: 'person3',
    fromDate: 5,
    toDate: 6,
  },
  {
    name: 'person4',
    fromDate: 10,
    toDate: 20,
  }, {
    name: 'person5',
    fromDate: 25,
    toDate: 16,
  },
]

// eslint-disable-next-line camelcase
athlete_list = [1, 2, 3]
//  select * from SQL where fromDate >= 2 and toDate <

setValue(){
  this.myControl.setValue('Murugan1')
}

ngOnInit(): void {

  this.myControl.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
console.log(value);

  });
  const from = 5;
  const to = 10;
  const starts = this.SQL.filter((option) => option.fromDate >= from);
  const end = this.SQL.filter((option) => option.toDate <= to);

  // console.log(starts);
  // console.log(end);
  const final = [...starts, ...end];

  const c = starts.concat(end.filter((item) => starts.indexOf(item) < 0));
  // const c = starts.concat(end.filter((item) =>  starts.indexOf(item) < 0));

  const cd = final.filter((data, i) => final.findIndex((item) => (item.name === data.name)) === i);

  // console.log(cd);
  //  const token =  { ['Orange','Red']
  //   publicKey:'BPJz0E5NdqrgBNDYIHNEnu4MsObWYvOMRem0Ko8yMKC7rrc-lhjUya2qVl4xxQ_r2LxvzbgVII3vpH4yNhr1B9k',
  //   privateKey:'2ft9kVC41dWdW8DR66LBT2PvzfxI-4sRLvhzxvdd15c'
  // }
  setTimeout(() => {
    this.viewMoreLoad = false;
    document.getElementById('search')?.focus();
  }, 300);
}

testing(input){

  clearTimeout(this.timeoutId);

  // Set a new timeout to trigger the API call after 1 second (1000 milliseconds)
  this.timeoutId = setTimeout(() => {
   console.log(input)

  }, 300);
}

// subscribeToNotifications() {
//   this.swPush.requestSubscription({
//     serverPublicKey: this.VAPID_PUBLIC_KEY,
//   })
//     .then((sub) => this.newsletterService.addPushSubscriber(sub).subscribe())
//     .catch((err) => console.error('Could not subscribe to notifications', err));
// }

callFunction() {
  const items = [
    {
      code: 901,
      paid: 55,
      invamt: 52.50,
    },
    {
      code: 903,
      paid: 90,
      invamt: 89.25,
    },
    // {
    //   code : 904,
    //   paid: 150,
    //   invamt : 147.00
    // },
    // {
    //   code : 905,
    //   paid: 210,
    //   invamt : 210.00

    // },
    //    {
    //   code : 907,
    //   paid: 37 ,
    //   invamt :36.75

    // },
    // {
    //   code : 4125,
    //   paid: 5,
    //   invamt :  3.86
    // },
    // {
    //   code : 932,
    //   paid: 221,
    //   invamt :220.50
    // },

  ];
  for (const item of items) {
    const APIJson = {
      InvSelMethod: 'SELFPC',
      WhichTerm: 'SS',
      saleType: 'CASH',
      Salesman: '',
      usr: 'MOHANKUMAR@SWD',
      fromdevice: 'TAB',
      Custcode: '0',
      discType: 'Full',
      discPer: 0,
      authBy: '',
      itemDetails: `${item.code}|1|NP|0`,
      ServeType: 'SELFV2',
      wtrCode: 0,
      paidAmount: item.paid,
      CardCqBank: '',
      PayThru: '',
      PayTrnNo: '',
      payInstrDate: 'toPrinter',
      orderno: '',
      custQtnNo: '9999999999',
      dlyIncharge: '',
      roundedOff: 'RndOf',
      InvAmount: item.invamt,
      extra1: 'e1',
      extra2: 'Counter Sales',
      extra3: 'e3',
      extra4: '',
      extra5: '0',
    };


    this.subs.add(
      this.mService.EMKTest(APIJson).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.log('complete');
        },
      }),
    );
  }
}

gmainRouting(set, status) {
  this.global.gmainMenuSelected = status;
  ((set === 'finbook') ? this.router.navigate(['/finbookGroup/fin-book']) : this.router.navigate(['/finbookGroup/VIC-Group']));
}

DCNoteRouting(status) {
  this.global.gmainMenuSelected = status;
  this.router.navigate(['/DCNote']);
}

JVRouting(status) {
  this.global.gmainMenuSelected = status;
  this.router.navigate(['/Journal-Voucher']);
}

AmcRouting(status) {
  this.global.gmainMenuSelected = status;
  this.router.navigate(['/AMC-Master']);
}

OpeBalRoute(status) {
  this.global.gmainMenuSelected = status;
  this.router.navigate(['/Opening-Balance']);
}

// { option: 'Factory Production (FinishedPrd)', image: 'factoryrm.png', root: '/factory-production', main: 'FinishedPrd' },
// { option: 'Production Set Detailed Report', image: 'factoryrm.png', root: '/store_issue', main: '' },
// { option: 'Tare weight Master', image: 'factoryrm.png', root: '/tare_weight', main: '' },
// { option: 'Production Barcode', image: 'qr_code.png', root: '/production_barcode', main: '' },
// { option: 'Factory Production (IssueOnlyToproduct)', image: 'factoryrm.png', root: '/factory-production', main: 'IssueOnlyToproduct' },
// { option: 'Factory Production (Prdn_IssueBOTH)', image: 'factoryrm.png', root: '/factory-production', main: 'Prdn_IssueBOTH' },
Production(status) {
  this.global.gmainMenuSelected = status;
  this.router.navigate(['/factory-Prod']);
}

applyFilter(event, key) {
  if (event.key === 'Enter') {
    console.log(key.toLowerCase());
    const tbody = document.querySelectorAll('.text-xs');
    tbody.forEach((element:any) => {
      console.log(element.innerHTML);
      const Name = (element.innerHTML).toLowerCase();
      if (Name.startsWith(key.toLowerCase())) {
        console.log(element);
        element.focus();
      }
    });
  }
}
private timeoutId: any;



@ViewChild('videoPlayer') videoPlayer!: ElementRef;
openWebCam(){
  const video = this.videoPlayer.nativeElement;

  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
      video.play();
    })
    .catch(error => {
      console.error('Error accessing webcam:', error);
    });
  }

   pdfUrl = 'file:///C:/Users/MURUGAN.C/Desktop/RunningPrj/src/assets/Test.pdf';
  fileReader(event) {
    const pdfUrl = 'C:\Users\MURUGAN.C\Desktop\RunningPrj\src\assets/Test.pdf';
    console.log(pdfjsLib.getDocument(pdfUrl));
    

    pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
      console.log(pdf);
      
      return pdf.getPage(1);
    }).then(page => {
      console.log(page);
      return
      const scale = 1.5;
      const viewport = page.getViewport({ scale });
      // const canvas = this.pdfViewer.nativeElement as HTMLCanvasElement;
      // const context = canvas.getContext('2d');

      // canvas.height = viewport.height;
      // canvas.width = viewport.width;

      // page.render({ canvasContext: context, viewport });
    }).catch(error => {
      console.error('Error loading PDF:', error);
    });
  }


}
