import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  cardDad: {
    width: 300,
    height: 150,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'black',
    fontSize: 20,
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    gap: 10
  },
  boxView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  textTitle: {
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 18
  },
  text: {
    marginRight: 10,
    width: 190,
    fontSize: 16,
  }
});
