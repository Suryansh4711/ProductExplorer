import React, {useEffect, useMemo, useRef} from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {COLORS, FONTS} from '../utils/constants';

interface SidebarProps {
  visible: boolean;
  onClose: () => void;
  onNavigate: (routeName: string) => void;
}

const MENU_ITEMS = ['Explore', 'Saved', 'Inventory', 'Profile'];

export const Sidebar = ({visible, onClose, onNavigate}: SidebarProps) => {
  const {width} = useWindowDimensions();
  const drawerWidth = useMemo(() => Math.min(width * 0.75, 320), [width]);
  const translateX = useRef(new Animated.Value(-drawerWidth)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: visible ? 0 : -drawerWidth,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [drawerWidth, translateX, visible]);

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <Animated.View
        style={[
          styles.drawer,
          {width: drawerWidth, transform: [{translateX}]},
        ]}>
        <Text style={styles.title}>Menu</Text>
        {MENU_ITEMS.map(item => (
          <TouchableOpacity
            key={item}
            style={styles.menuItem}
            onPress={() => {
              onNavigate(item);
              onClose();
            }}>
            <View style={styles.menuDot} />
            <Text style={styles.menuText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    zIndex: 10,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(17, 24, 39, 0.35)',
  },
  drawer: {
    backgroundColor: COLORS.white,
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: {width: 4, height: 0},
    elevation: 6,
  },
  title: {
    fontSize: 18,
    fontFamily: FONTS.headline,
    color: COLORS.secondary,
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  menuDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    marginRight: 12,
  },
  menuText: {
    fontSize: 15,
    fontFamily: FONTS.body,
    color: COLORS.secondary,
  },
});
