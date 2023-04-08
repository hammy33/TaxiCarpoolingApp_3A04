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
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 50,
    alignSelf: 'center',
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
  goBackButton: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  });

export default styles;