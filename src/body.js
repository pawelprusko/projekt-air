import React, { Component } from 'react';
import { db } from './firebase';
import gif from './jpg/we.gif';

// <div id="test3" style={{backgroundImage: "url("+ gif + ")", width: "30px", height: "40px"}}></div>

class Body extends Component {
    constructor() {
        super();
        this.state = {
            isShown: true,
            windowHeight: undefined,
            windowWidth: undefined,
            post: '',
            quotes: []
        }
    }
    handleResize = () => this.setState({
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth
      });

    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize)

      // fetch("https://api.gios.gov.pl/pjp-api/rest/aqindex/getIndex/550")
      // .then((res) => {
      //  return res.json()
      // }).then((res) => {
      //  this.setState({
      //    post: res
      //  })
      //  console.log(res)
      // }).catch((error) => {
      //  console.log(error);
      // })

     db.collection('quotes').get().then((snap) => {
        snap.docs.forEach((e) => {
          console.log( e.data());
          this.setState({
              quotes: [
                  ...this.state.quotes,
                  e.data()
              ]
          })
      })
     });
   }
      componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize) 
      }
    turnRight = e => {
        this.setState({
          isShown:!this.state.isShown
        })
      }
    render() {
              if(this.state.quotes.length == 0) {
                return (<div style={{minWidth: "100%", minHeight: "100%", position: "absolute", background: "white", display: "flex", justifyContent: "center", alignItems: "center", color: "rgb(46, 211, 255)", fontSize: "2.5vw", fontFamily: 'Poppins', letterSpacing: "1vw"}}>
                  <h1>My Warsaw Air. </h1>
                  
                  </div>
                )
              } else {
                console.log(this.state.quotes[0].first);
              }
             
                //WRZUCENIE DO TABLICY WARTOŚCI OBIEKTU I LOSOWANIE:
                let valuesQuotes = Object.values(this.state.quotes[0]);
                let randomQoutes = valuesQuotes[Math.floor(Math.random()*valuesQuotes.length)]
                

              /////////////Dane z GIOŚ - jakość powietrza  
                //  if(!this.state.post) {
                //  return <h1>Loading ... </h1>
                //  }
                // console.log(this.state.post.pm10IndexLevel.indexLevelName);
        let apiAnswer = "Dobry"//this.state.post.pm10IndexLevel.indexLevelName;

        let allertBlue = () => {
        switch(apiAnswer){
          case "Bardzo dobry":
          case "Dobry":
          return (
            <div id="allertBlue" style={move} >
              <h1 id="mainTextBlue">Today's mood</h1>
             <div id="emotIconGood"></div>
             <article>You can stay in the air for any length of time. Just enjoy the good air and have hope that tomorrow will be even better or at least the same. We all keep our fingers crossed for that!</article>
        </div>
          );
          case "Umiarkowany":
          case "Dostateczny":
          return (
            <div id="allertBlue" style={move} >
              <h1 id="mainTextBlue">Today's mood</h1>
             <div id="emotIconMiddle"></div>
             <article>It is necessary to limit the time of being in the air - especially by pregnant women, children and the elderly as well as by persons with asthma, allergic diseases of the skin, eyes and circulatory diseases</article>
        </div>
          );
          case "Zły":
          case "Bardzo zły":
          return (
            <div id="allertBlue" style={move} >
              <h1 id="mainTextBlue">Today's mood</h1>
             <div id="emotIconBad"></div>
             <article>Do not stay in the open air for too long. This applies especially to pregnant women, children and the elderly as well as those suffering from asthma, allergic diseases of the skin, eyes and circulatory system diseases. </article>
        </div>
          );
        }
      }
      const styleRightBox = {
            opacity: this.state.isShown ? "1" : "0"
      }
      const styleRightBlue = {
            right: this.state.isShown ? "-48vw" : "0vw",
            width: "48vw",
            minHeight: "100%"
      }
      const styleRightBlueDown = {
        width: "100%",
        minHeight: "48vh",
        bottom: this.state.isShown ? "-200vh" : "0vh",
      }
      const move = this.state.windowWidth > 800 ? styleRightBlue : styleRightBlueDown;
      const rollButton = {
            left: this.state.isShown ? "0" : "18vw",
            transform: this.state.isShown ? "rotate(0deg)" : "rotate(360deg)"
      }
      const rollButtonDown = {
            top: this.state.isShown ? "0" : "8vw",
            transform: this.state.isShown ? "rotate(0deg)" : "rotate(360deg)"
      }
      const roll = this.state.windowWidth > 800 ? rollButton : rollButtonDown;
      const blueFont = {
            color: this.state.isShown ? "white" : "rgb(46, 211, 255)"
      }
      const whiteFont = {
            color: this.state.isShown ? "rgb(46, 211, 255)" : "white"
      }

      return (
        <div className="App">
          <div id="mainBox">
            {allertBlue()}
            <div id="leftBox">
              <h1 id="mainText" style={blueFont}><span id="firstLetter"style={whiteFont}>M</span>y <span id="firstLetter" style={whiteFont}>W</span>arsaw <span id="firstLetter" style={whiteFont}>A</span>ir.</h1>
              <button id="buttonMain" onClick={this.turnRight} style={roll}><span id="buttonText" >check</span></button>
            </div>
            <div id="rightBox" style={styleRightBox}>
                <div id="boxLine">
                    <h2 id="mainText"><span id="firstLetter">YOUR</span> DAILY <span id="firstLetter">EARTH</span> QUOTE</h2>
                        <div id="rightLine"></div>
                         <div id="rightBackground">
                         <article>{randomQoutes}
                         </article>
                        </div>
                     </div>
                </div>
            </div>
            <div id="footer">
              <div id="rightFooter">
                <p>part of<span id="mwaColor1"> dear</span><span id="mwaColor">Earth</span> project</p>
              </div>
            </div>
        </div>
      );
    }
  }

  export default Body;
  

