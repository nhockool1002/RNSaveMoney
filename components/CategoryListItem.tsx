import React from 'react'; 
import { 
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

export default function CategoryListItem(props: any) {
  const { item, onPress } = props
  return <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.textTitle}>{item.title}</Text>
        <Image source={item.image} style={styles.categoryImage} />
      </View>
    </TouchableOpacity>
}

CategoryListItem.propTypes = {
  item: PropTypes.any,
  onPress: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 4,
    marginBottom: 16,
    /* CSS SHADOW FOR iOS */
    backgroundColor: `${process.env.BLACK_COLOR}`,
    shadowColor: `${process.env.PRIMARY_BACKGROUND_DARK_COLOR}`,
    shadowOpacity: 0.8,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 0 },
    /* CSS SHADOW FOR Android */
    elevation: 5
  },
  textTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'uppercase',
    color: `${process.env.WHITE_COLOR}`,
  },
  categoryImage: {
    width: 64,
    height: 64
  }
})