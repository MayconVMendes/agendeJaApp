import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  containerCentral: {
    display: 'flex',
    textAlign: 'center',
  },
  titleLogin: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4b9fe1',
    marginTop: '4%',
  },
  titleTela: {
    fontSize: 25,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: '4%',
    marginBottom: '4%',
  },
  centerViewEmail: {
    alignItems: 'center',
  },
  centerViewSenha: {
    alignItems: 'center',
    marginTop: '3%',
  },
  centerViewBtn: {
    alignItems: 'center',
    marginTop: '5%',
  },
  btn: {
    backgroundColor: '#4b9fe1',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#4b9fe1',
    width: 150,
    height: 40,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  textBtn: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
