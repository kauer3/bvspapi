import { StyleSheet } from '@react-pdf/renderer';

const styleCustom = StyleSheet.create({
  page: {},
  cover: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  departmentContent: {
    backgroundColor: '#666262',
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    height: '100vh',
    position: 'absolute',
    right: 0,
  },
  departmentText: {
    textTransform: 'uppercase',
    fontSize: 13,
    color: '#FFF',
  },
  logo: {
    alignItems: 'center',
    marginVertical: 20,
    flex: 1,
  },
  logoImage: {
    width: 120,
    height: 29,
  },
  title: {
    width: '80%',
    fontWeight: 'bold',
    fontSize: 13,
    paddingVertical: 7,
    paddingHorizontal: 15,
    color: '#FFF',
    backgroundColor: '#D92332',
    borderTopRightRadius: 100,
    borderBottomLeftRadius: 100,
  },
  content: {
    width: '100%',
    marginLeft: 30,
  },
  contentParts: {
    width: '100%',
    padding: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  part: {
    borderWidth: 1,
    borderColor: '#cecece',
    width: 105,
    alignItems: 'center',
    padding: 3,
    marginRight: 20,
    marginVertical: 5,
  },
  imagePart: {
    height: 70,
  },
  namePart: {
    height: 40,
    width: '100%',
    color: '#666262',
    fontSize: 10,
    textAlign: 'center',
  },
  codesPart: {
    color: '#666262',
    fontSize: 8,
    marginVertical: 2,
  },
  section: {
    flexDirection: 'row',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});

export default styleCustom;
