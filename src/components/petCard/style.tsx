import styled from "styled-components";

export const CardContainer = styled.div`
    .card-container{
          font-family:'Poppins';
            display:flex;
            flex-direction:column;
            width:300px;
            height:auto;
            background-color:white;
            border: solid 2px black;
            border-radius:4px;
        }
        .card-container.found{
            box-shadow:0px 20px 25px -10px var(--found-color);
            border-color:var(--found-color);
        }
        .pet-img{
            width:100%;
        }
        
          .text-container{
            margin:30px 10px;
          }
          .text-container.no-report{
            display:flex;
            justify-content:space-between;
          }
          .report-pet-info{
            text-decoration:underline;
            color:blue;
            cursor:pointer;
          }
          .report-pet-info.no-report{
            display:none;
          }
          .edit-button{
            display:none;
          }
          .edit-button.no-report{
            display:inline;
            height:24px;
            cursor:pointer;
          }
          .found-title{
            display:none;
          }
          .found-title.found{
            display:inline;
            color:var(--found-color);
          }
          .delete-pet__link{
            display:none;
          }
          .delete-pet__link.found{
            margin:10px;
            display:inline;
            text-decoration: underline;
            cursor:pointer;
          }
`