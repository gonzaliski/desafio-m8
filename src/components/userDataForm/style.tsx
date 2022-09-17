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
      gap:20px;
   }
   @media(min-width: 768px){
    .form__container{
        width: 30vw;
    }
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