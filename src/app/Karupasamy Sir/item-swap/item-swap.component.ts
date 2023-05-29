/* eslint-disable no-use-before-define */
/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-empty-function */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-param-reassign */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, distinctUntilChanged, of } from 'rxjs';
import { Globals } from 'src/app/globals';
import { CommonService } from 'src/app/services/common.service';
import { SubSink } from 'subsink/dist/subsink';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-item-swap',
  templateUrl: './item-swap.component.html',
  styleUrls: ['./item-swap.component.scss'],
})
export class ItemSwapComponent implements OnInit {
  OverAllItemList = [];

  ItemList = [];

  searchTemp = '';

  searchTempOne = ''

  displayedColumns = ['sno', 'subicode', 'subiname', 'TimeNow', 'Usr', 'Delete'];

  columnHeaders = {
    sno: ['S.No'],
    subicode: ['ProductCode'],
    subiname: ['ProductName'],
    TimeNow: ['CreatedTime'],
    Usr: ['Createdby'],
    Delete: ['Delete'],
  };

  displayedColumnsOne = ['sno', 'View', 'icode', 'iname'];

  columnHeadersOne = {
    sno: ['S.No'],
    icode: ['ItemCode'],
    iname: ['Item Name'],
    View: ['View'],
  };

  loading = false;

  loadingOne = false;

  private subs = new SubSink();

  datasource = new MatTableDataSource([]);

  datasourceOne = new MatTableDataSource([]);

  SubItemList = [];

  ItemName = new FormControl(null, Validators.required);

  CreateItemForm = this.fbuilder.group({
    MainItem: [null, Validators.required],
    ItemCode: [null, Validators.required],
    ItemName: [null, Validators.required],
  });

  consoleMessages: any;

  constructor(
    public dialog: MatDialog,
    private globals: Globals,
    private commonservice: CommonService,
    private fbuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.commonservice.apiUrl = this.globals.gApiserver;
    if (this.globals.gclientServer === 'Client') {
      this.commonservice.reqSendto = 'datareqKarSmyOne';
    } else {
      this.commonservice.reqSendto = 'KarSyApiOne';
    }

    this.viewMappedItem();
    this.getAllItemList();
    this.getSubItemList();
  }

  getAllItemList() {
    this.commonservice.autoComplete(this.ItemName.valueChanges).subscribe((data) => {
      const APIJson = {
        reqMainreq: 'ISwapItemNameFilter',
        Usr: this.globals.gUsrid,
        brcode: this.globals.gBrcode,
        var20: data,
      };
      this.ItemList = [];
      this.subs.add(this.commonservice.sendReqst(APIJson).subscribe({
        next: (response) => {
          if (response) {
            setTimeout(() => {
              if (response.length === 0) {
                this.commonservice.openSnackbar('No data available', 'close', 1500);
              } else if (response[0].StatusRes === 'Success') {
                this.ItemList = response.splice(0, 200);
              } else {
                this.commonservice.openSnackbar(response[0].StatusRes, 'close', 1500);
              }
            }, 300);
          } else {
            this.commonservice.openSnackbar('No response', 'close', 1500);
          }
        },
        error: (error) => {
          setTimeout(() => {

          }, 300);
          this.commonservice.openSnackbar(error.statusText, 'close', 1500);
        },
        complete: () => {},
      }));
    });
  }

  getSubItemList() {
    this.commonservice.autoComplete(this.CreateItemForm.get('ItemName').valueChanges).subscribe((data) => {
      const APIJson = {
        reqMainreq: 'ISwapItemNameFilter',
        Usr: this.globals.gUsrid,
        brcode: this.globals.gBrcode,
        var20: data,
      };
      this.SubItemList = [];
      this.subs.add(this.commonservice.sendReqst(APIJson).subscribe({
        next: (response) => {
          if (response) {
            setTimeout(() => {
              if (response.length === 0) {
                this.commonservice.openSnackbar('No data available', 'close', 1500);
              } else if (response[0].StatusRes === 'Success') {
                this.SubItemList = response.splice(0, 200);
              } else {
                this.commonservice.openSnackbar(response[0].StatusRes, 'close', 1500);
              }
            }, 300);
          } else {
            this.commonservice.openSnackbar('No response', 'close', 1500);
          }
        },
        error: (error) => {
          setTimeout(() => {

          }, 300);
          this.commonservice.openSnackbar(error.statusText, 'close', 1500);
        },
        complete: () => {},
      }));
    });
  }

  viewMappedItem() {
    this.loadingOne = true;
    const APIJson = {
      reqMainreq: 'ISwapAllMainItemsView',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
    };
    this.ItemList = [];
    this.datasourceOne = new MatTableDataSource([]);

    this.subs.add(this.commonservice.sendReqst(APIJson).subscribe({
      next: (response) => {
        this.loadingOne = false;
        if (response) {
          if (response.length === 0) {
            this.commonservice.openSnackbar('No data available', 'close', 1500);
          } else if (response[0].StatusRes === 'Success') {
            this.searchTempOne = '';
            this.searchTemp = '';
            this.datasourceOne = new MatTableDataSource(response);
          } else {
            this.commonservice.openSnackbar(response[0].StatusRes, 'close', 1500);
          }
        } else {
          this.commonservice.openSnackbar('No response', 'close', 1500);
        }
      },
      error: (error) => {
        this.loadingOne = false;

        this.commonservice.openSnackbar(error.statusText, 'close', 1500);
      },
      complete: () => {},
    }));
  }

  displayItem = (option) => (option && option.iname ? option.iname : '');

  displayIcode = (option) => (option && option.icode ? option.icode : '');

  applyFilter(event) {
    this.datasource.filter = event.trim().toLowerCase();
  }

  applyFilterOne(event) {
    this.datasourceOne.filter = event.trim().toLowerCase();
  }

  itemcodeselected(e) {
    if (e.key.toLowerCase() === 'enter') {
      const APIJson = {
        reqMainreq: 'ISwapSearchItemCode',
        Usr: this.globals.gUsrid,
        brcode: this.globals.gBrcode,
        var1: Number(e.target.value),
      };

      this.subs.add(this.commonservice.sendReqst(APIJson).subscribe({
        next: (response) => {
          this.CreateItemForm.get('ItemName').setValue('');

          if (response) {
            if (response.length === 0) {
              this.commonservice.openSnackbar('No data available', 'close', 1500);
            } else if (response[0].StatusRes === 'Success') {
              this.CreateItemForm.get('ItemName').setValue(response[0].iname);
              document.getElementById('submit').focus();
            } else {
              this.commonservice.openSnackbar(response[0].StatusRes, 'close', 1500);
            }
          } else {
            this.commonservice.openSnackbar('No response', 'close', 1500);
          }
        },
        error: (error) => {
          this.loadingOne = false;

          this.commonservice.openSnackbar(error.statusText, 'close', 1500);
        },
        complete: () => {},
      }));
    }
  }

  ItemSelected(event) {
    if (event.source.selected) {
      setTimeout(() => {
        this.GetTableList();
      }, 100);
    }
  }

  SubItemSelected(event, option) {
    if (event.source.selected) {
      setTimeout(() => {
        this.CreateItemForm.get('ItemCode').setValue(option.icode);
        document.getElementById('submit').focus();
      }, 200);
    }
  }

  ItemRefresh() {
    if (this.ItemName.valid && this.commonservice.checkTypeValitity(this.ItemName.value, 'Item name')) {
      this.GetTableList();
    }
  }

  viewRow(viewRow) {
    setTimeout(() => {
      this.ItemName.setValue(viewRow);
      this.GetTableList();
    }, 200);
  }

  GetTableList() {
    this.loading = true;
    const APIJson = {
      reqMainreq: 'ISwapItemsView',
      Usr: this.globals.gUsrid,
      brcode: this.globals.gBrcode,
      var1: this.ItemName.value.icode,
    };
    this.datasource = new MatTableDataSource([]);
    this.subs.add(this.commonservice.sendReqst(APIJson).subscribe({
      next: (response) => {
        if (response) {
          this.loading = false;
          if (response.length === 0) {
            this.commonservice.openSnackbar('No data available', 'close', 1500);
          } else if (response[0].StatusRes === 'Success') {
            this.datasource = new MatTableDataSource(response);
          } else {
            this.commonservice.openSnackbar(response[0].StatusRes, 'close', 1500);
          }
        } else {
          this.commonservice.openSnackbar('No response', 'close', 1500);
        }
      },
      error: (error) => {
        this.loading = false;

        this.commonservice.openSnackbar(error.statusText, 'close', 1500);
      },
      complete: () => {},
    }));
  }

  CreateNewItem(Template: TemplateRef<any>) {
    if (this.ItemName.valid) {
      this.CreateItemForm.reset();
      this.CreateItemForm.get('MainItem').setValue(this.ItemName.value.iname);
      this.SubItemList = [];
      this.dialog.open(Template, {
        maxWidth: '400px', maxHeight: '630px', disableClose: true, autoFocus: false, data: 'Edit',
      });
    } else {
      this.commonservice.openSnackbar('please choose item name', 'Ok', 1500);
    }
  }

  deleteRow(Row) {
    this.commonservice.taskConfirmation('Are you sure to delete ?', '', true, 'Delete', '').then((res) => {
      if (res.isConfirmed) {
        const APIJson = {
          reqMainreq: 'ISwapDeleteItem',
          Usr: this.globals.gUsrid,
          brcode: this.globals.gBrcode,
          var1: String(this.ItemName.value.icode),
          var3: Row.subicode,

        };

        this.subs.add(this.commonservice.sendReqst(APIJson).subscribe({
          next: (response) => {
            if (response) {
              setTimeout(() => {
                this.loading = false;
                if (response.length === 0) {
                  this.commonservice.openSnackbar('No data available', 'close', 1500);
                } else if (response[0].StatusRes === 'Success') {
                  this.GetTableList();
                  this.viewMappedItem();
                  this.commonservice.openSnackbar('Item deleted successfully', 'Ok', 2000);
                } else {
                  this.commonservice.openSnackbar(response[0].StatusRes, 'close', 1500);
                }
              }, 300);
            } else {
              this.commonservice.openSnackbar('No response', 'close', 1500);
            }
          },
          error: (error) => {
            setTimeout(() => {
              this.loading = false;
            }, 300);
            this.commonservice.openSnackbar(error.statusText, 'close', 1500);
          },
          complete: () => {},
        }));
      }
    });
  }

  submitDialog() {
    if (this.CreateItemForm.valid) {
      const SubICode = this.CreateItemForm.value.ItemCode;
      const SubIName = this.CreateItemForm.value.ItemName;
      const checkIcode = this.datasource.data.some(
        (e) => e.subicode === String(SubICode) && e.subiname === SubIName,
      );
      if (checkIcode) {
        Swal.fire({ text: 'Same record already exist' });
      } else {
        this.commonservice.taskConfirmation('Are you sure to Save ?', '', true, 'Save', '').then((res) => {
          if (res.isConfirmed) {
            const APIJson = {
              reqMainreq: 'ISwapSaveNewItem',
              Usr: this.globals.gUsrid,
              brcode: this.globals.gBrcode,
              var1: String(this.ItemName.value.icode),
              var2: String(this.ItemName.value.iname),
              var3: SubICode,
              var4: SubIName,

            };

            this.subs.add(this.commonservice.sendReqst(APIJson).subscribe({
              next: (response) => {
                if (response) {
                  setTimeout(() => {
                    this.loading = false;
                    if (response.length === 0) {
                      this.commonservice.openSnackbar('No data available', 'close', 1500);
                    } else if (response[0].StatusRes === 'Success') {
                      this.commonservice.openSnackbar('New record saved successfully', 'Ok', 1500);
                      this.dialog.closeAll();
                      this.viewMappedItem();
                      this.GetTableList();
                    } else {
                      Swal.fire({ text: response[0].StatusRes });
                    }
                  }, 300);
                } else {
                  this.commonservice.openSnackbar('No response', 'close', 1500);
                }
              },
              error: (error) => {
                setTimeout(() => {
                  this.loading = false;
                }, 300);
                this.commonservice.openSnackbar(error.statusText, 'close', 1500);
              },
              complete: () => {},
            }));
          }
        });
      }
    } else {
      this.commonservice.openSnackbar('Please fill all the fields', 'close', 1500);
    }
  }

  downloadXl() {
    if (this.datasource.data.length > 0) {
      const newArr = this.datasource.data;
      newArr.forEach((element) => {
        delete element.StatusRes;
      });
      this.commonservice.exportAsExcelFile(this.datasource.data, `${this.ItemName.value.iname}_ItemList`);
    } else {
      this.commonservice.openSnackbar('No data to export', 'Ok', 1500);
    }
  }

  downloadXlOne() {
    if (this.datasourceOne.data.length > 0) {
      const newArr = this.datasourceOne.data;
      newArr.forEach((element) => {
        delete element.StatusRes;
      });

      this.commonservice.exportAsExcelFile(this.datasourceOne.data, 'MappedItems');
    } else {
      this.commonservice.openSnackbar('No data to export', 'Ok', 1500);
    }
  }

  Decimal(event: any) {
    return (
      (event.charCode === 46 && event.target.value.indexOf('.') === -1)
      || (event.charCode >= 48 && event.charCode <= 57)
    );
  }
}
