package com.serenity;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.cinder92.musicfiles.RNReactNativeGetMusicFilesPackage;
import com.rnfs.RNFSPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.guichaguri.trackplayer.TrackPlayer;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.drazail.rnandroidstore.RNAndroidStorePackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNReactNativeGetMusicFilesPackage(),
            new RNFSPackage(),
            new FastImageViewPackage(),
            new TrackPlayer(),
            new RNGestureHandlerPackage(),
            new VectorIconsPackage(),
            new RNAndroidStorePackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
