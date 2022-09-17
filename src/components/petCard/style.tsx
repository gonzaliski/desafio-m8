import styled from "styled-components";

export const CardContainer = styled.div`
    .card-container{
          font-family:'Poppins';
            display:flex;
            flex-direction:column;
            width:300px;
            height:auto;
            background-color:white;
            border: solid 2px var(--border-color);
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
            padding:30px 10px;
            border-top: 1px solid var(--border-color);
            display:flex;
            justify-content: space-between;
            align-items: center;
          }
          .text-container.no-report{
            display:flex;
            justify-content:space-between;
          }

          .edit-button{
            width:20px;
            height:20px;
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