import React from 'react';
import ChatBot from 'react-simple-chatbot';

import { useHistory, useLocation} from 'react-router-dom'
import { ThemeProvider } from 'styled-components';
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export function MyChatbot(props){
  const location = useLocation()
  const history = useHistory()
  const [t, i18n] = useTranslation("global");

  function useQuery() {
       return new URLSearchParams(location.search);
   }
   let query = useQuery();


  const theme = {
    background: '#f5f8fb',
    fontFamily: 'Arial',
    headerBgColor: '#9abf15',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#9abf15',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
  };

  const config = {
     width: "400px",
     height: "500px",
     floating: true,
     headerTitle: 'Toni Bot',
     floatingStyle: {
       width: '50px',
       height: '50px'
     }
   };

  const steps=[
      {
        id: '0.1',
        message: 'Hello! my name is Toni-Bot, I will be your guide on this ecommerce!',
        trigger: '0.02',
      },
      {
        id:'0.02',
        message: 'what is your name?',
        trigger: '0.03'
      },
      {
        id:'0.03',
        user: true,
        trigger: '0.04'
      },
      {
        id: '0.04',
        message: 'what would you like to do {previousValue}?',
        trigger: '0.3',
      },
      {
        id: '0.2',
        message: 'what would you like to do?',
        trigger: '0.3',
      },
      {
        id: '0.3',
        options: localStorage.getItem("supabase.auth.token") ? [
          { value: 1, label: 'Buy hardware', trigger: '2' },
          {value: 2, label: 'sell hardware', trigger: '3'},
          { value: 3, label: 'see my profile', trigger: '4'},
          { value: 5, label: 'see my cart', trigger: '6'},
          { value: 4, label: 'meet the creators of this ecommerce', trigger: '4.5'},
        ] : [
          { value: 1, label: 'Buy hardware', trigger: '2' },
          {value: 2, label: 'Log in or register', trigger: '3.5'},
          { value: 3, label: 'meet the creators of this ecommerce', trigger: '4.5'},
          { value: 5, label: 'change the language', trigger: '7'}
        ],
      },
      {
        id: '2',
        message: 'Great! we have a lot of hardware, but they can be grouped into different categories.',
        delay: 2,
        trigger: '2.1',
      },
      {
        id: '2.1',
        delay: 2,
        options: [
          { value: 1, label: 'Computer components', trigger: '2.2'},
          { value: 2, label: 'Laptops', trigger: '2.3' },
          { value: 3, label: 'KeyBoards', trigger: '2.4' },
          { value: 4, label: 'Processors', trigger: '2.5' },
          { value: 5, label: 'Monitors', trigger: '2.6' },
          { value: 6, label: 'Periphreal devices', trigger: '2.7' },
          { value: 7, label: 'Storages', trigger: '2.8' },

        ],
      },
      {
        id: '2.2',
        message: 'Great! you will be redirected to that category',
        trigger: () => {
          query.set('category', 'Computer components')
                history.push('/catalogue' + `?${query}`)
                return "999"
        },
      },
      {
        id: '2.3',
        message: 'Great! you will be redirected to that category',
        trigger: () => {
          query.set('category', 'Laptops')
                history.push('/catalogue' + `?${query}`)
                return "999"
        },
      },
      {
        id: '2.4',
        message: 'Great! you will be redirected to that category',
        trigger: () => {
          query.set('category', 'KeyBoards')
                history.push('/catalogue' + `?${query}`)
                return "999"
        },
      },
      {
        id: '2.5',
        message: 'Great! you will be redirected to that category',
        trigger: () => {
          query.set('category', 'Processors')
                history.push('/catalogue' + `?${query}`)
                return "999"
        },
      },
      {
        id: '2.6',
        message: 'Great! you will be redirected to that category',
        trigger: () => {
          query.set('category', 'Monitors')
                history.push('/catalogue' + `?${query}`)
                return "999"
        },
      },
      {
        id: '2.7',
        message: 'Great! you will be redirected to that category',
        trigger: () => {
          query.set('category', 'Periphreal devices')
                history.push('/catalogue' + `?${query}`)
                return "999"
        },
      },
      {
        id: '2.8',
        message: 'Great! you will be redirected to that category',
        trigger: () => {
          query.set('category', 'Storages')
                history.push('/catalogue' + `?${query}`)
                return "999"
        },
      },
      {
        id: '3',
        message: 'Great! you will be redirected to the product creation page',
        trigger: () => {
          history.push('/addproduct')
          return "999"
        },
      },
      {
        id: '3.5',
        message: 'Great! you will be redirected to register/login page',
        trigger: () => {
          history.push('/access')
          return "999"
        },
      },
      {
        id: '4',
        message: 'Great! you will be redirected to your profile',
        trigger: () => {
          history.push('/myProfile')
        },
      },
      {
        id: '6',
        message: 'Great! you will be redirected to your cart',
        trigger: () => {
          history.push('/order')
        },
      },
      {
        id: '7',
        message: 'Great! on this page there are two languages ​​available',
        trigger: '7.1',
      },
      {
        id: '7.1',
        options: [
          { value: 1, label: 'English', trigger: () => {
            i18n.changeLanguage("en")
            return '7.2'
          } },
          { value: 2, label: 'Spanish', trigger: () => {
            i18n.changeLanguage("es")
            return '7.2'
          }},
        ],
      },
      {
        id: '7.2',
        message: 'The language has been changed succesfully!',
        trigger: '999'
      },
      {
        id: '4.5',
        message: 'Great! you will be redirected to the about page!',
        trigger: () => {
          history.push('/about')
          return '789'
        },
      },
      {
        id:'789',
        message: 'my creators are very handsome, right? they are very talented, pst, pst, if you are a recruiter feel free to hire them.',
        trigger: "999"
      },
      {
        id: '999',
        message: 'Would you like to do something else?',
        trigger: '9999'
      },
      {
        id: '9999',
        options: [
          { value: 1, label: 'Yes', trigger: '0.2'},
          { value: 2, label: 'No', trigger: '99'},
        ],
      },
      {
        id: '99',
        message: 'okay, I see you later. If you want to chat again just refresh the page',
        end: true
      },
      ]

  return(
    <ThemeProvider theme={theme}>
      <ChatBot steps={steps} {...config}/>
    </ThemeProvider>
  )
}
