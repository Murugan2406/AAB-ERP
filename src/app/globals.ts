/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
/* eslint-disable lines-between-class-members */
/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
import { Injectable } from '@angular/core';

export const MyDateFormat = {
  parse: {
    dateInput: 'DD-MMM-YYYY',
  },
  display: {
    dateInput: 'DD-MMM-YYYY',
    monthYearLabel: 'DD MMM YYYY',
    startView: 'months',
    minViewMode: 'months',
  },
};

export const MY_MONTH_FORMATS = {
  parse: {
    dateInput: 'MMM - YYYY',
  },
  display: {
    dateInput: 'MMM - YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Injectable()
export class Globals {
  // tslint:disable-next-line:max-line-length
  public TmpCdeFedG = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfZ2tleSI6IkJSTEdOfk11cnVnYW5AU1dEIiwiaWF0IjoxNjg1MzM2MTg1LCJleHAiOjE2ODU0MzYxODV9.wpOhyPPof-m6UG4cDLX_C_NecpRJRChYZt8VapCtQhM";

  // TmpCdeFedG = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfZ2tleSI6IkJSTEdOfk11cnVnYW5AU1dEIiwiaWF0IjoxNjg0OTIxMzIzLCJleHAiOjE2ODUwMjEzMjN9.RFSTazQ9UlGEgrPOGyk7oIHIJ9F6unvGlHWRdKxXdLo";

  // public TmpCdeFedG = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfZ2tleSI6IkJSTEdOfk11cnVnYW5AU1dEIiwiaWF0IjoxNjc4NzY4OTQ4LCJleHAiOjE2Nzg4Njg5NDh9.kYg15QyOMDnigxyYgZEF1gVvC6jK7mneg5tUFrTioIY';

  // public gApiserver = 'https://10.21.208.194:9001'; // client

  // public gServerApiUrl = 'https://10.21.208.194:9000'; // client

  public gApiserver = 'https://10.200.201.86:9003'; // server
  public gServerApiUrl = 'https://10.200.201.86:9003';// client

  
  // UIT
  // public gApiserver = 'https://10.200.201.86:9009'; // server
  // UIT
  // public gApiserver = 'https://10.200.201.86:9010'; // client


  // public gApiserver = 'https://10.20.222.66:9000';
  // public gServerApiUrl = 'https://10.20.222.66:9000';

  // public gApiserver = 'https://10.20.227.2:9003';
  // public gServerApiUrl = 'https://10.20.209.2:9003';

  //  public gclientServer = 'Server';

  //  public gApiserver = 'https://10.21.227.2:9000';
  //  public gApiserver = 'https://aaberp.aabsweets.com:9001'

  //  public gServerApiUrl = 'https://aaberp.aabsweets.com:9001'

    public gclientServer = 'Client';

    // public gApiserver = 'https://10.20.222. 99:9000' // Client

    // public gServerApiUrl = 'https://10.20.222.99:9000' // Client

  public gTerCode = 'ST';

  public gTerName = 'PA';

  showAnimi = true;

  //  public gApiserver = 'https://10.21.202.2:9000' // Anna ngar liv

  //  public gServerApiUrl = 'https://10.21.202.2:9000' // Anna ngar liv

  public gRateoption = '';

  public gterminalGrpCash = '';

  public gkGstGdsServSply = 'GoodsSupply';

  public gkGstSerTaxPerc = 0;

  public gprinterForterminal4080 = '40';

  public gNetworkprinterIp = 'tcp://10.20.209.24';

  public gUsrDefultCmpCode = 'AABSIPL';

  public gUsrDefultCmpName = 'ADYAR ANANDA BHAVAN SWEETS';

  public gUsrDefultFbCode = 'TNFB';

  public gUsrDefultFbName = 'TAMILNADU FB';

  public gInvthrusms = 'No';

  public gBeginTran = ''

  public gkDate = new Date();

  public gTblSelected = '';

  public gCustSelected = '';

  public gCustcode = '';

  public gCustMobileseld = '';

  public gCustNameseld = '';

  public gCustCount = '';

  public gCustdisper = 0;

  public gOnlinepayStatus = '0';

  public gEInvoiceYN = 'No';

  public gDateOptional = '';

  public gDcSaveMethod = 'Get Dc Online';

  public gFileSharingPath = '';

  public gFileShareBackupPath = '';

  public gErrorYN = '';

  public gErrorinfo = '';

  public issueItems = [];

  public loggedIn = 'false';

  public gTrnNo = '';

  public gTrnAmount = 0;

  public orderno = '';

  // public gBrcode = 12345;
  public gBrcode = 214;

  // public gBrcode = 59;
  public gBrcodeString = '214';

  public gCountry = 'INDIA';

  public gState = 'TAMIL NADU';

  // public gBrname = 'AMBATTUR KITCHEN-II';
  public gBrname = 'Testing Branch';

  public gRateRegion = '0';

  public gSessionId = '0';

  public globalServerUrl = '0';

  public gsideMenuSelected = '';

  public gOptionSelected = '';

  public gdivOptSelected = '';

  public SelectedFlag = '';

  public gCamefrom = '';

  public SelectedRouteName = '';

  public SelectedMenuTitle = '';

  public gCustMobCompulsaryforInvoice = 'No';

  public SelectDashboard = 'GROUPLIST';

  public selectedGrpMenu = '';

  // public gUsrid = 'KUMAR@SWD';

  // public gUsrid = 'Saranya@SWD';

  // public gUsrid = 'Ramachandran@swd';

  public usrCaption = 'Murugan@SWD';
  // public gUsrid = 'Murugan@SWD';0
  public gUsrid = 'KUMAR@SWD';

  // kannadasan@bst';// ; //Ramachandran@swd ,'KRISHNAKUMAR@SWswD'
  public Pwrusr = 'ADMIN';

  public gUsrDefultRegion = '';

  public gUsrDefultBrcode = '';

  public gUsrDefultFactory = '';

  public gUsrDefultFactCode = '';

  public gFinalconfResult = '';

  public gLabelprinterIp = '10.20.209.37';

  public subcat = '';

  public gcat = '';

  public gRtlItemBack = false;

  public gRtlSubcat = false;

  public gOrdervalue = 0;

  public gprogressval = '0';

  public gApiserverBOTH = '';

  public gversionid = '';

  public gLoginEmpcode = 'ADF224';

  public gdateformat = 'DD/MMM/YYYY';

  public gmainMenuSelected ;

  public gweightmchnIp ='10.20.209.36';

  public gCurrency = 'INR';

  public varLetBigIntFloat = 'GkRTZWxmT3J6MTU3NzI0OT12345';

  public gCostcenterShopFact = '';

  public gbilling = 'Normal';
  public BillMde_CFrm = 'LnSale';

  public gGstorVat ='';

  public gInvAmtBeforeRndoff = 0;

  public extPltfmShopOpnClsUrl = '';

  public extPltfmOutofStkUrl ='';

  public urpanpiperapikey = '';89

  public extPltfmStsUpdUrl = '';

  public extPltfmOrderCancelUrl = '';

  public gFromdate='';
  public gTodate='';

public gCmplogo = 'data:image/png;base64,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';
}