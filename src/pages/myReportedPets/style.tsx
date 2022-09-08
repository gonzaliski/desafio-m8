import styled from "styled-components";

export const MyReportsContainer = styled.div`
.container,.pets-container{
    height: var(--remaining-page-height);
    display: flex;
    justify-content: center;
}
.pets-container{
    align-items: center;
    justify-content: unset;
    gap:15px;
    flex-direction: column;
    overflow: auto;
    padding: 10px 0;
}

h2{
    margin:20px;
}

`