import styled from "styled-components";

export const MyDataContainer = styled.div`
   .content{
    height: var(--remaining-page-height);
    display: flex;
    justify-content: center;
    width:100vw;
    }
   
    .form__container{
        position: absolute;
        top: 20%;
      display:flex;
      flex-direction:column;
      justify-content:space-between;
      align-items:center;
      gap:20px;
      max-height: 200px;
   }
        .form-inputs{
            display:flex;
            flex-direction:column;
            gap:20px;
            width:100%;
            padding:0;
        }
        li{
            gap: 5px;
            display: flex;
            flex-direction: column;
            list-style:none;
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

        .err{
            color:red;
        }
`