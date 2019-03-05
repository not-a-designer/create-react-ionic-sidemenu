module.exports = `
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { IonMenu, 
         IonHeader, 
         IonToolbar, 
         IonTitle, 
         IonContent, 
         IonList, 
         IonMenuToggle, 
         IonItem, 
         IonLabel, 
         IonIcon } from '@ionic/react';


class Menu extends Component {
    
    render() {
    return (
        <IonMenu contentId="main" menuId="main" side="start">
            <IonHeader>
                <IonToolbar color="primary">
                <IonTitle>Menu</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                <IonMenuToggle>
                    <NavLink style={{textDecoration: 'none'}} to="/home">
                        <IonItem button>
                            <IonIcon slot="start" name="home"></IonIcon>
                            <IonLabel>Home</IonLabel>
                        </IonItem>
                    </NavLink>
                </IonMenuToggle>
                <IonMenuToggle>
                    <NavLink style={{textDecoration: 'none'}} to="/list">
                        <IonItem button>
                            <IonIcon slot="start" name="list" />
                            <IonLabel>List</IonLabel>
                        </IonItem>
                    </NavLink>
                </IonMenuToggle>
                </IonList>
            </IonContent>
            </IonMenu>
        );
    }
}


export default Menu;
`;
