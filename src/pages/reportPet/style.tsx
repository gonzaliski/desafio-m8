import styled from "styled-components";

export const ReportContainer = styled.div`
.container{
    height: var(--remaining-page-height);
      overflow:auto;
}
.content{
      
      margin: 0 auto;
      width:70vw;
    }
    @media(min-width:768px){
      .content{
        max-width:500px;
      }
    }
    .report-container{
      width:100%;
      height:100%;
      display:flex;
      flex-direction:column;
      justify-content:space-between;
      align-items:center;
      gap:20px;
   }
    .form-inputs{
        width:100%;
        padding:0;
    } 
    .form-label{
      font-size:16px;
      font-weight:500;
  }
                                 
    .title__container{
      width:100%;
      display: inline-block;
      text-align:left;
      margin-bottom:30px;
  }
  .image-drop__container{
    width:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:20px;
  }
  .dropzone-button{
    width:100%;
  }
    .report-dropzone__img{
      width:100%;
    }
    .mapbox__container{
      width:100%;
      display:flex;
      flex-direction:column;
      align-items:center;
    }
    .input-container{
      width: 100%;
      display: flex;
      gap: 5px;
      flex-direction:column;
    }

    .mapbox-button{
      width:80px;
    }

    .input-items__container{
      display: flex;
    align-items: center;
    gap: 20px;
    }
    .location-input{
      width:400px;
    }

    .location-text{
      font-weight:500;
      text-align:left;
    }
    
    .founded-button{
      display:none;
    }
    .founded-button.active{
      display:inline;
    }
    .unpublish-pet__link{
      display:none;
    }
    .unpublish-pet__link.active{
      display:inline;
      text-decoration: underline;
      cursor:pointer;
    }
`
