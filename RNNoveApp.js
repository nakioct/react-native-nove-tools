import {Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View, NativeModules} from 'react-native';
import React, {Component} from 'react';
import Toast from 'react-native-root-toast';
import CodePush from 'react-native-code-push';
import NetInfo from '@react-native-community/netinfo';
import SplashScreen from 'react-native-splash-screen';

class RNNoveApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      receivedBytes: 0,
      totalBytes: 0,
      isCalledUpdateMethod: false,
    };
  }

  _octWelcomeUpdate = async () => {
    const updateMessage = (await CodePush.checkForUpdate()) || {};
    await CodePush.sync(
      {
        installMode: CodePush.InstallMode.IMMEDIATE,
        mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
        rollbackRetryOptions: {
          maxRetryAttempts: 3,
        },
      },
      status => {
        switch (status) {
          case 7:
            this.setState({visible: true});
            break;
          case 8:
            this.setState({visible: false});
            break;
        }
      },
      ({receivedBytes, totalBytes}) => {
        this.setState({
          receivedBytes: (receivedBytes / 1024).toFixed(2),
          totalBytes: (totalBytes / 1024).toFixed(2),
        });
      },
    );
  };

  oct_handleUpdate = () => {
    this._octWelcomeUpdate();
  };

  componentDidMount() {
    SplashScreen.hide();

    this.unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        if (!this.state.isCalledUpdateMethod) {
          this.setState({isCalledUpdateMethod: true});
          this.oct_handleUpdate();
        }
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <View style={styles.magicContainer}>
        {!this.state.visible ? (
          <TouchableOpacity
            style={styles.updateMagicTips}
            onPress={() => {
              if (this.state.receivedBytes < 100) {
                this.oct_handleUpdate();
              }
            }}>
            <Text style={{fontSize: 16, color: 'black'}}>点击更新</Text>
          </TouchableOpacity>
        ) : null}
        <Toast visible={this.state.visible} position={Dimensions.get('window').height / 2 - 20} shadow={false} animation={false}>
          下载中: {Math.round((this.state.receivedBytes / this.state.totalBytes) * 100 * 100) / 100 || 0}%
        </Toast>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  updateMagicTips: {
    marginTop: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 24,
    width: 220,
    height: 48,
  },

  magicContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default RNNoveApp;
