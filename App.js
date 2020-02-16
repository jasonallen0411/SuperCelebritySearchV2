/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
  TextInput,
  ToastAndroid,
  Button,
  FlatList,
  Dimensions,
  StatusBar,
} from 'react-native';

import SpeechAndroid from 'react-native-android-voice';

import Divider from 'react-native-divider';

import {List,
        ListItem,
       }
        from 'react-native-elements';

import Carousel from 'react-native-looped-carousel';

import axios from "axios";

import {
  Header,
  // LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const { width, height } = Dimensions.get('window');

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      size: { width, height },
      wikis: [],
      itunes: [],
      movies: [],
      input: ''
    };
    this.wikiSearch = this.wikiSearch.bind(this);
    this.itunesSearch = this.itunesSearch.bind(this);
    this.movieSearch = this.movieSearch.bind(this); 
  }
  
  _onLayoutDidChange = e => {
    const layout = e.nativeEvent.layout;
    this.setState({ size: { width: layout.width, height: layout.height } });
  };

  async _buttonClick(){
    var spokenText = await SpeechAndroid.startSpeech("Speak yoo", SpeechAndroid.ENGLISH);
    ToastAndroid.show(spokenText , ToastAndroid.LONG);
    // Voice.start('es_US', {
    //   "RECOGNIZER_ENGINE": "GOOGLE",
    //    "EXTRA_PARTIAL_RESULTS": true
    // })
    try{
        //More Locales will be available upon release.
        var spokenText = await SpeechAndroid.startSpeech("Speak yo", SpeechAndroid.ENGLISH);
        ToastAndroid.show(spokenText , ToastAndroid.LONG);

        
    }catch(error){
        switch(error){
            case SpeechAndroid.E_VOICE_CANCELLED:
                ToastAndroid.show("Voice Recognizer cancelled" , ToastAndroid.LONG);
                break;
            case SpeechAndroid.E_NO_MATCH:
                ToastAndroid.show("No match for what you said" , ToastAndroid.LONG);
                break;
            case SpeechAndroid.E_SERVER_ERROR:
                ToastAndroid.show("Google Server Error" , ToastAndroid.LONG);
                break;
            /*And more errors that will be documented on Docs upon release*/
        }
    }
  };
 
  wikiSearch(){
      
      let wikiURL =
        "https://en.wikipedia.org//w/api.php?action=opensearch&format=json&origin=*&search=" +
        //  "https://en.wikipedia.org//w/api.php?action=parse&format=json&origin=*&page=" +
        //  "https://en.wikipedia.org//w/api.php?action=query&list=search&srsearch=" +
        this.state.input + "&format=json&origin=*";
        
    
      axios.get(wikiURL, {
        headers: { "Content-Type": "application/json; charset=UTF-8" }
      })
      .then(res => {
        let wikiData = res.data;
        // alert(res.data);
        this.setState({ wikis: wikiData || [] });
      })
      .catch(err => console.error(err.message));


    };

  itunesSearch() {

    let itunesURL =
      "https://itunes.apple.com/search?term=" +
      this.state.input +
      "&limit=5";
    axios.get(itunesURL, {
        headers: { "Content-Type": "application/json; charset=UTF-8" }
      })
      .then(res => {
        res.data;
        this.setState({ itunes: res.data.results || [] });
        //alert(this.state.itunes)
      })
      .catch(err => console.error(err.message));
  };

  movieSearch() {

    
    let w500 = "https://image.tmdb.org/t/p/w500";
    let original = "https://image.tmdb.org/t/p/original";


    let movieURL =
      "https://api.themoviedb.org/3/search/person?api_key=84c329a92566be57845322a19ff707ac&query=" +
      this.state.input;
      axios.get(movieURL, {
        headers: { "Content-Type": "application/json; charset=UTF-8" }
      })
      .then(res => {
        const movie = res.data;
        
        //  alert(movie.results);
        this.setState({ movies: movie.results || [] });
      })
      .catch(err => console.error(err.message));
  };
      
  
  // --OLD CODE--

      // let wikiStuff = document.getElementById("wikiStuff");
      // let wikiStuff1 = document.getElementById("wikiStuff1");
      // axios.get(wikiURL, {
      //   headers: { "Content-Type": "application/json; charset=UTF-8" }
      // })
      // .then(res => {
      //   const wiki = res.data;
      //   console.log(wiki);
      //   wikiStuff.style.display = "block";
      //   wikiStuff1.style.display = "block";
      //   wikiStuff.innerHTML = "";
      //   wikiStuff.append(wiki[1]);
      //   return { wikis: wiki || [] };
      //    this.setState({ wikis: wiki || [] });
      // })
      // .catch(err => console.error(err.message));

      // let input = document.getElementById("input")! as HTMLInputElement;
      // let ituneStuff = document.getElementById("ituneStuff")!;
      // let ituneStuff1 = document.getElementById("ituneStuff1")!;
      // let itunesURL =
      //   "https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?term=" +
      //   this.state.input +
      //   "&limit=20";

      // alert(res.data.results[0].artistName);
      // ituneStuff.style.display = "block";
      // ituneStuff1.style.display = "block";
      // ituneStuff.innerHTML = "";
      // ituneStuff.append(
      //   "Artist Name: " +
      //   itune.results[0].artistName +
      //   ", Track Name: " +
      //   itune.results[0].trackName +
      //   ", Track Price: $" +
      //   itune.results[0].trackPrice
      // );
      // return { itunes: itune || [] };

      // let input = document.getElementById("input")! as HTMLInputElement;
      // let movieStuff = document.getElementById("movieStuff")!;
      // let imageArea = document.getElementById("imageArea")!;
      // let movieStuff1 = document.getElementById("movieStuff1")!;
      // let moviePoster = document.getElementById("moviePoster")!;

      // movieStuff.style.display = "block";
      // movieStuff1.style.display = "block";
      // movieStuff.innerHTML = "";
      //moviePoster.setAttribute("src", w500 + movies.results[0].known_for[0].poster_path)
      // for (var i = 0; i < movies.results[0].known_for.length; i++){
      //   if(movies.results[0].known_for[i]){
      //     imageArea.innerHTML += '<img src="' + w500 + movies.results[0].known_for[i].poster_path + '" />';
      //     movieStuff.append(
      //       "Name: " +
      //        movies.results[0].name +
      //       "Popularity: " +
      //        movies.results[0].popularity +
      //       "Known for: " +
      //        moviePoster.setAttribute("src", w500 + movies.results[0].known_for[i].poster_path) +
      //        movies.results[0].known_for[i].poster_path +
      //       "Title: " +
      //        movies.results[0].known_for[i].title +
      //       "Release Date: " +
      //        movies.results[0].known_for[i].release_date
      //     );
      //   }
      // }
      // return { movie: movies || [] };

  //--END OF OLD CODE--
  

    render() {
    let itunesContent /*= <Text>{JSON.stringify(this.itunes)}</Text>*/;
      //if(this.itunes.length != 0){
        itunesContent = this.state.itunes.map(r => {
          return (
            <View>
              <Text>
                {`${r.trackName}`}
              </Text>
            </View>
          );
        });
      //}

      

      

      let movieContent;
            

            movieContent = this.state.movies.map((r, i) => (
              r.known_for.map((k, i) => (
                
                  <View style={styles.moviesStuff}>
                    <Image source = {{ uri: 'https://image.tmdb.org/t/p/w500/' + k.poster_path }} style={styles.movieImageView} />
                    <Text>
                      
                      <Text style={styles.moviesStuff}>
                        Name: 
                      </Text>
                      <Text style={styles.moviesStuff2}>
                        {`${r.name}`}
                      </Text>
                      
                    </Text>

                    <Text>
                      
                      <Text style={styles.moviesStuff}>
                      Popularity: 
                      </Text>
                      <Text style={styles.moviesStuff2}>
                      {`${r.popularity}`}
                      </Text>
                      
                    </Text>

                    <Text>
                      
                      <Text style={styles.moviesStuff}>
                      Title: 
                      </Text>
                      <Text style={styles.moviesStuff2}>
                      {`${k.title}`}
                      </Text>
                      
                    </Text>
                    
                    <Text>
                      
                      <Text style={styles.moviesStuff}>
                      Release Date: 
                      </Text>
                      <Text style={styles.moviesStuff2}>
                      {`${k.release_date}`}
                      </Text>
                      
                    </Text>
                    <Divider></Divider>
                  </View>
                
              ))
            ))

            

      return (
        <>
        <StatusBar barStyle="dark-content" />
          <SafeAreaView>
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={styles.scrollView}>
              {/* <Header /> */}
              {global.HermesInternal == null ? null : (
                <View style={styles.engine}>
                  <Text style={styles.footer}>Engine: Hermes</Text>
                </View>
              )}
              
              {/* <Image source = {require('./assets/AppBackground.png')} style={styles.backgroundImage} /> */}

              <ImageBackground
                source={require('./assets/AppBackground.png')}
                style={styles.backgroundImage}>
                
                <View style={styles.sectionContainerC}>
                  <Text style={styles.sectionTitle}>Celebrity Search!</Text>
                </View>
                
                <View style={styles.input}>
                  <TextInput
                    id="input"
                    style={{height: 40}}
                    placeholder="Search for Celebrity..." 
                    onChangeText={(input) => this.setState({input})}
                    value={this.state.input} 
                  />

                  <TouchableOpacity onPress={() => {this._buttonClick();}}>
                    <Image source = {require('./assets/microphone.png')} style={styles.micImage} />
                  </TouchableOpacity>
                  
                  
                </View>

                {/* <View style={styles.fixToText}>
                  <Button style={styles.fixToText}
                    id="infoBtn"
                    color="red"
                    onPress={() => {_buttonClick();}}
                    title="Voice"
                  />
                  
                  
                  </View> */}
              
              <View style={styles.fixToText}>
                  <Button style={styles.fixToText}
                    id="infoBtn"
                    color="#ffd400"
                    onPress={() => {this.wikiSearch(); this.itunesSearch(); this.movieSearch()}}
                    title="Get Info"
                  />
                  </View>
                  
              </ImageBackground>
              {/* <View style={styles.sectionContainerC}>
                  <Text style={styles.sectionTitle}>Celebrity Search!</Text>
                </View>

                <View style={styles.input}>
                  <TextInput
                    id="input"
                    style={{height: 40}}
                    placeholder="Search for Celebrity..."
                    onChangeText={(input) => this.setState({input})}
                    value={this.state.input}
                  />
                  
                  
                </View>
              
              <View style={styles.fixToText}>
                  <Button style={styles.fixToText}
                    id="infoBtn"
                    color="#ffd400"
                    onPress={() => {this.wikiSearch(); this.itunesSearch(); this.movieSearch()}}
                    title="Get Info"
                  />
                  </View> */}
                
                
              <View style={styles.carousel} onLayout={this._onLayoutDidChange}>
                  <Carousel
                    delay={2000}
                    style={this.state.size}
                    autoplay={false}
                    pageInfo
                    currentPage={0}
                    onAnimateNextPage={p => console.log(p)}>
                    <View style={[{ backgroundColor: 'white' }, this.state.size]}>

                    <Text style={styles.wikiStuff1}> <Image source = {require('./assets/wikiLogo.png')} style={styles.logoImage} /> Wikipedia Info:</Text>

                    <Text>
                      <Text style={styles.wikiStuff2}>Name: </Text> 
                      <Text style={styles.wikiStuff}>{this.state.wikis[0]}</Text>
                    </Text>

                    <Text>
                      <Text style={styles.wikiStuff2}>Description: </Text> 
                      <Text style={styles.wikiStuff}>{this.state.wikis[2]}</Text>
                    </Text>
                      
                    </View>
                    

                    
                    <View style={[{ backgroundColor: '#400040' }, this.state.size]}>
                      {/* We Know this Works */}
                      {/* {itunesContent} */}
                      <Text style={styles.iTunesStuff1}><Image source = {require('./assets/itunesLogo.png')} style={styles.logoImage} /> iTunes Info:</Text>
                      <FlatList
                        data={this.state.itunes}
                        renderItem={({ item }) => (
                          <View>
                            
                            <Image source = {{ uri: item.artworkUrl60 }} style={styles.imageView} />

                            <Text>
                              <Text style={styles.iTunesStuff}>Artist Name: </Text> 
                              <Text style={styles.iTunesStuff2}>{item.artistName}</Text>
                            </Text>
                          
                            <Text>
                              <Text style={styles.iTunesStuff}>Collection Name: </Text> 
                              <Text style={styles.iTunesStuff2}>{item.collectionName}</Text>
                            </Text>

                            <Text>
                              <Text style={styles.iTunesStuff}>Track Name: </Text> 
                              <Text style={styles.iTunesStuff2}>{item.trackName}</Text>
                            </Text>

                            <Divider></Divider>
                          </View>
                          // <ListItem
                          //   id={item.collectionId}
                          //   title={item.trackName}
                          // />
                        )}
                      />
                    </View>
                    <View style={[{ backgroundColor: '#010012'}, this.state.size]}>
                      <Text style={styles.moviesStuff1}><Image source = {require('./assets/TMDBLogo.png')} style={styles.logoImage} /> Movies Info:</Text>
                      
                      {movieContent}
                      
                    </View>
                  </Carousel>
                </View> 
                

                
               
              
                {/* <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>See Your Changes</Text>
                  <Text style={styles.sectionDescription}>
                    <ReloadInstructions />
                  </Text>
                </View>
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Debug</Text>
                  <Text style={styles.sectionDescription}>
                    <DebugInstructions />
                  </Text>
                </View>
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Learn More</Text>
                  <Text style={styles.lastDescription}>
                    Read the docs to discover what to do next:
                  </Text>
                </View> */}
                {/* <LearnMoreLinks /> */}
              
                
                
                
            </ScrollView>
          </SafeAreaView>
        </>
      );
    };
};


// --STYLES--


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.celebSearchBackground,
  },
  backgroundImage: {
    flex: 1,
    width: 'auto',
    height: 900,
    resizeMode: 'cover', 
    position: 'relative',
  },
  logoImage:{
    width: 30,
    height: 30
  },
  micImage:{
    width: 40,
    height: 40
    // backgroundColor: 'red',
  },
  input: {
    marginTop: 20,
    marginLeft: 55,
    width: 300,
    backgroundColor: Colors.white,
    color: Colors.white,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'

  },
  fixToText:{
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Colors.celebSearchBackground,
  },
  carousel:{
    flex: 1,
    marginTop: -380,
    height: 1200,
  },
  wikiStuff1:{
    fontWeight: 'bold',
    fontSize: 24,
  },
  wikiStuff2:{
    fontWeight: 'bold',
    fontSize: 20,
  },
  wikiStuff:{
    fontSize: 18,
    flexDirection: 'column',
    marginLeft: 7,
  },
  iTunesStuff1:{
    fontWeight: 'bold',
    fontSize: 24,
    color: 'white',
  },
  iTunesStuff2:{
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  iTunesStuff:{
    fontSize: 18,
    color: 'white',
    flexDirection: 'column',
    marginLeft: 7,
  },
  moviesStuff1:{
    fontWeight: 'bold',
    fontSize: 24,
    color: 'white',
  },
  moviesStuff2:{
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  moviesStuff:{
    fontSize: 18,
    color: 'white',
    flexDirection: 'column',
    marginLeft: 7,
  },
  moviesStuffContainer:{
    flexDirection: 'row',
  },
  imageView: {
    width: 80,
    height: 80,
    margin: 7
  },
  movieImageView: {
    width: 100,
    height: 150,
    marginLeft: 5,
  },
  sectionContainerC: {
    marginTop: 265,
    paddingHorizontal: 55,
 },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 40,
    fontWeight: '600',
    fontFamily: 'Fanfare',
    color: '#FFDF00',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.lighter
  },
  lastDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.lighter,
    paddingBottom: 20,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});


export default App;









// --ORIGINAL CODE AFTER IMPORT STATEMENTS--

// const App: () => React$Node = () => {





  
//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//           <Header />
//           {global.HermesInternal == null ? null : (
//             <View style={styles.engine}>
//               <Text style={styles.footer}>Engine: Hermes</Text>
//             </View>
//           )}
//           <View style={styles.body}>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Step One</Text>
//               <Text style={styles.sectionDescription}>
//                 Edit <Text style={styles.highlight}>App.js</Text> to change this
//                 screen and then come back to see your edits.
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>See Your Changes</Text>
//               <Text style={styles.sectionDescription}>
//                 <ReloadInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Debug</Text>
//               <Text style={styles.sectionDescription}>
//                 <DebugInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Learn More</Text>
//               <Text style={styles.lastDescription}>
//                 Read the docs to discover what to do next:
//               </Text>
//             </View>
//             {/* <LearnMoreLinks /> */}
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.celebSearchBackground,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.white,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.lighter
//   },
//   lastDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.lighter,
//     paddingBottom: 20,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });

// export default App;



