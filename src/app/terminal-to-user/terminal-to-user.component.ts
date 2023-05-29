/* eslint-disable max-len */
/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
  FormBuilder, FormControl, Validators,
} from '@angular/forms';
import { SubSink } from 'subsink';
import Swal from 'sweetalert2';
import { DhibhaDataService } from '../services/dhibhaData.service';
import { Globals } from '../globals';

@Component({
  selector: 'app-terminal-to-user',
  templateUrl: './terminal-to-user.component.html',
  styleUrls: ['./terminal-to-user.component.css'],
})
export class TerminalToUserComponent implements OnInit {
  private subs = new SubSink();

  terminalName: FormControl = new FormControl(null, Validators.required);

  CustomerName: FormControl = new FormControl(null, Validators.required);

  terControl:FormControl = new FormControl(null, Validators.required);

userControl:FormControl = new FormControl(null, Validators.required);

ipControl:FormControl =new FormControl(null, Validators.required);;

overAllTerminal = [];

  terminalcode:any;

  TerName:any;

  userName: any;

  userIp: any;

  tempUserName: any;

  tempIp: any;

  TertoUser:any=[];

  IpforTer:any=[];

  User:any=[];

  LoadTerminal:any=[]

  constructor(
private router: Router,
    private service: DhibhaDataService,
    private fb: FormBuilder,
    private globals: Globals,
  ) {
    this.service.terminalurl = this.globals.gApiserver;
    this.terControl = new FormControl();
    this.userControl = new FormControl(null, Validators.required);
    this.ipControl = new FormControl();
  }

  ngOnInit(): void {
    this.TerminalSearch('');
    this.UserNameSearch();
    this.IpSearch();
  }

  back() {
    this.router.navigate(['/dashboard']);
  }

  home() {
    this.globals.SelectDashboard = 'GROUPLIST';
    this.router.navigate(['/dashboard']);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  TerminalSearch(keyValue) {
    const reqForTerminal = { reqMainreq: 'MR_LoadTerminals', Usr: this.globals.gUsrid, var4: keyValue };
    this.subs.add(this.service.TerminalstoUser(reqForTerminal).subscribe((data: any) => {
      if (data.length === 0) {
        this.service.openSnackBar('No data available');
      } else if (data[0].StatusResponse === 'Success') {
        this.overAllTerminal = data;
      } else {
        this.service.openSnackBar(data[0].StatusResponse);
      }
    }));
  }

  TerminalChange(key:any) {
    const keyValue = key.toLocaleUpperCase();
    this.LoadTerminal = this.overAllTerminal.filter((option) => option.TerName.toLocaleUpperCase().includes(keyValue));
  }

  TerminaltoUser(Tcode:any) {
    this.TertoUser = [];
    const reqForTUser = { reqMainreq: 'TerminalToUsr', Usr: this.globals.gUsrid, var1: Tcode };
    this.subs.add(this.service.TerminalstoUser(reqForTUser).subscribe((data: any) => {
      if (data) {
        if (data.length > 0) {
          if (data[0].StatusResponse === 'Success') {
            this.TertoUser = data;
          } else {
            this.service.openSnackBar(data[0].StatusResponse);
          }
        } else {
          this.service.openSnackBar('No User Avalible');
        }
      }
    }, (err) => {
      Swal.fire({ text: 'Server Response Failed' });
    }));
  }

  IpforTerminal(Tcode:any) {
    this.IpforTer = [];
    const reqForTIp = { reqMainreq: 'IPForTerminals', Usr: this.globals.gUsrid, var1: Tcode };
    this.subs.add(this.service.TerminalstoUser(reqForTIp).subscribe((data: any) => {
      if (data) {
        if (data.length > 0) {
          if (data[0].StatusResponse === 'Success') {
            const result = data;
            if (result.length > 0) {
              let i;
              for (i = 0; i < result.length; i++) {
                result[i].IPter = result[i].ip;
                delete result[i].ip;
              }
              this.IpforTer = result;
            } else {
              this.service.openSnackBar(data[0].StatusResponse);
            }
          } else {
            this.service.openSnackBar('No User Avalible');
          }
        }
      }
    }, (err) => {
      Swal.fire({ text: 'Server Response Failed' });
    }));
  }

  UserNameSearch() {
    this.userControl.valueChanges.pipe(debounceTime(600), distinctUntilChanged())
      .subscribe((Uname) => {
        const Api = {
          reqMainreq: 'TerminalToUsrSearch',
          Usr: this.globals.gUsrid,
          var4: Uname,
        };
        this.subs.add(
          this.service.TerminalstoUser(Api).subscribe({
            next: (response:any) => {
              if (response.length === 0) {
                this.service.openSnackBar('No data available');
              } else if (response[0].StatusResponse === 'Success') {
                this.User = response;
              } else {
                this.service.openSnackBar(response[0].StatusResponse);
              }
            },
            error: (error) => {
              Swal.fire({ text: 'Http failure response' });
            },
            complete: () => {},
          }),
        );
      });
  }

  autoUser(event:any, TCode:any) {
    if (event.source.selected) {
      this.TerminaltoUser(TCode);
      this.IpforTerminal(TCode);
    }
  }

  reload() {
    if (this.terminalName.value) {
      if (typeof this.terminalName.value === 'object') {
        const TCode = this.terminalName.value.TerCode;
        this.TerminaltoUser(TCode);
        this.IpforTerminal(TCode);
      } else {
        this.service.openSnackBar('PLease choose valid Terminal name');
      }
    } else {
      this.service.openSnackBar('Please choose Terminal Name');
    }
  }

  displayFn = (option) => (option && option.TerName ? option.TerName : '')

  LoadIp:any=[];

  IpSearch() {
    this.subs.add(
      this.ipControl.valueChanges.pipe(debounceTime(600)).subscribe((Ipname: any) => {
        const reqForTerminal = { reqMainreq: 'IPSearch', Usr: this.globals.gUsrid, var4: Ipname };
        this.subs.add(this.service.TerminalstoUser(reqForTerminal).subscribe((data: any) => {
          if (data.length === 0) {
            this.service.openSnackBar('No data available');
          } else if (data[0].StatusResponse === 'Success') {
            this.LoadIp = data;
          } else {
            this.service.openSnackBar(data[0].StatusResponse);
          }
        }));
      }),
    );
  }

  displayuserName = (option) => (option && option.username ? option.username : '')

  displayStystemIP = (option) => (option && option.code ? option.code : '');

  adduser() {
    if (this.terminalName.invalid) {
      Swal.fire({ text: 'Please Choose Terminal Name' });
      return;
    }
    if (this.userControl.value) {
      if (typeof this.userControl.value !== 'object') {
        Swal.fire({ text: 'Please choose valid User Name' });
        return;
      }

      const currUser = this.userControl.value.username;

      const found = this.TertoUser.some((el:any) => el.username === currUser);

      if (!found) {
        Swal.fire({
          title: 'Are you sure to add?',
          showCancelButton: true,
          confirmButtonText: 'Yes',
        }).then((result) => {
          if (result.isConfirmed) {
            const userObj = {
              TerName: this.terminalName.value.TerName,
              TerCode: this.terminalName.value.TerCode,
              username: currUser,
            };
            this.TertoUser.push(userObj);
            this.userControl.reset();
            this.Add();
          }
        });
      } else {
        Swal.fire({ text: 'User Already Exist !' });
      }
    } else {
      Swal.fire({ text: 'Please Enter User Name' });
    }
  }

  addip() {
    if (this.terminalName.invalid) {
      Swal.fire({ text: 'Please Choose Terminal Name' });
      return;
    }
    if (this.ipControl.value) {
      if (this.ipControl.invalid) {
        Swal.fire({ text: 'Please Enter System Ip Name' });
        return;
      }
      if (typeof this.ipControl.value !== 'object') {
        Swal.fire({ text: 'Please choose valid System Ip' });
        return;
      }
      const currId = this.ipControl.value.code;
      const found = this.IpforTer.some((el:any) => el.IPter === currId);

      if (!found) {
        Swal.fire({
          title: 'Are you sure to add?',
          showCancelButton: true,
          confirmButtonText: 'Yes',
        }).then((result) => {
          if (result.isConfirmed) {
            const userObj = {
              TerName: this.terminalName.value.TerName,
              TerCode: this.terminalName.value.TerCode,
              IPter: currId,
            };

            this.IpforTer.push(userObj);
            this.ipControl.reset();
            this.Add();
          }
        });
      } else {
        Swal.fire({ text: 'System Ip Already Exist !' });
      }
    } else {
      Swal.fire({ text: 'Please Enter System IP ' });
    }

    // eslint-disable-next-line indent
  }

  deleteuser(index:any) {
    Swal.fire({
      title: 'Are you sure to delete?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        const reqForSave = {
          reqMainreq: 'DeleteUsrTerminals', var1: this.terminalName.value.TerCode, var2: index,
        };
        this.subs.add(this.service.TerminalstoUser(reqForSave).subscribe((data: any) => {
          if (data.length === 0) {
            this.service.openSnackBar('No data available');
          } else if (data[0].StatusResponse === 'Success') {
            this.service.openSnackBar('Selected User deleted Successfully');

            setTimeout(() => {
              this.reload();
            }, 300);
          } else {
            this.service.openSnackBar(data[0].StatusResponse);
          }
        }));
      }
    });
  }

  deleteip(index:any) {
    Swal.fire({
      title: 'Are you sure to delete?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        const reqForSave = {
          reqMainreq: 'DeleteIPTerminals', var1: this.terminalName.value.TerCode, var2: index,
        };
        this.subs.add(this.service.TerminalstoUser(reqForSave).subscribe((data: any) => {
          if (data.length === 0) {
            this.service.openSnackBar('No data available');
          } else if (data[0].StatusResponse === 'Success') {
            this.service.openSnackBar('selected System IP deleted Successfully');
            setTimeout(() => {
              this.reload();
            }, 300);
          } else {
            this.service.openSnackBar(data[0].StatusResponse);
          }
        }));
      }
    });
  }

  Add() {
    const arraycopy = JSON.parse(JSON.stringify(this.TertoUser));
    arraycopy.filter((e:any) => {
      delete e.StatusResponse;
    });
    const arraycopy1 = JSON.parse(JSON.stringify(this.IpforTer));
    arraycopy1.filter((e:any) => {
      delete e.StatusResponse;
    });
    const reqForSave = {
      reqMainreq: 'S@/SaveTerToUserAndIP/E@', usr: this.globals.gUsrid, UsrTer: arraycopy, TerminalIP: arraycopy1,
    };
    this.subs.add(this.service.SaveTerminal(reqForSave).subscribe((data: any) => {
      if (data.length === 0) {
        this.service.openSnackBar('No data available');
      } else if (data[0].StatusResponse === 'Success') {
        this.service.openSnackBar('Record Added Successfully');
      } else {
        this.service.openSnackBar(data[0].StatusResponse);
      }
    }));
  }
}
