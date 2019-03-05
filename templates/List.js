module.exports = `
import React, { Component } from 'react';
import { IonPage, 
         IonHeader, 
         IonToolbar, 
         IonTitle, 
         IonButtons, 
         IonMenuButton, 
         IonContent, 
         IonList, 
         IonItem, 
         IonIcon, 
         IonNote} from '@ionic/react';


class List extends Component {
    state = {
        icons: [
            'flask',
            'wifi',
            'beer',
            'footbal',
            'basketball',
            'paper-plane',
            'american-football',
            'boat',
            'bluetooth',
            'build'
        ]
    };

    capitalize = (str: string) => {
        let newWord = [];
        for (let i = 0; i < str.length; i++) {
            (i !== 0) ? newWord.push(str[i]) : newWord.push(str[i].toUpperCase());
        }
        return newWord.join('');
    }

    render() {
        let listArr = this.state.icons.map((icon) => {
            let i = this.state.icons.indexOf(icon);
            return (
                <IonItem key={icon} >
                    <IonIcon slot="start" name={icon} />
                    {this.capitalize(icon)}
                    <IonNote slot="end">
                        {'This is item #' + i}
                    </IonNote>
                </IonItem>
            )
        });
    
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton autoHide={false} />
                        </IonButtons>
                        <IonTitle>List</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent padding>
                    <IonList>
                        {listArr}
                    </IonList>
                </IonContent>
            </IonPage>
        );
    }
}


export default List;
`;
