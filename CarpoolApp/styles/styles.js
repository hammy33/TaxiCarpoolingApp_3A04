import { StyleSheet } from 'react-native';


/* Colour palette:
*
* #E54B4B  - A bright red
* #FFA987  - a peach colour
* #F7EBE8  - new 'white'
* #444140  - charcoalish colour
* #1E1E24  - 'raisin' black
*/
const newWhite = '#F7EBE8'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#444140'
  },
  homeContainer: {
    alignSelf:'center', 
    flex: 1, 
    flexDirection: 'row', 
    rowGap: 2,
    columnGap: 0,
    flexWrap: 'wrap', 
    justifyContent: 'center',
  },
  questionContainer: {
    marginVertical: 15,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: newWhite
  },
  slider: {
    width: '100%',
    height: 40,
    color: '#FFF',
    thumbTintColor: '#FFF',
  },
  sliderValue: {
    fontSize: 18,
    alignSelf: 'flex-end',
    marginBottom: 10,
    color: '#FFF',
  },
  button: {
    backgroundColor: '#1E1E24',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 20,
    minWidth: 200,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  homeButton: {
    backgroundColor: '#1E1E24',
    borderRadius: 5,
    alignContent: 'center',
    alignSelf: 'center',
    paddingTop: 50,
    paddingBottom: 50,
    minWidth: 175,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 50,
    alignSelf: 'center',
  },
  homeLogo: {
    width: 250,
    height: 250,
    paddingTop: 150,
    marginTop: 150,
    alignSelf: 'center',
    marginBottom: 100,
  },
  profileImage: {
    width: 60,
    height: 60,
  },
  inputContainer: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  input: {
    fontSize: 18,
    paddingVertical: 10,
    paddingLeft: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
    color: '#F7EBE8',
  },
  });

export default styles;