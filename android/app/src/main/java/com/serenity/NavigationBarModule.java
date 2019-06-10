
package com.serenity;

import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;
import java.util.HashMap;

import android.os.Build;
import android.view.Window;
import android.graphics.Color;
import android.animation.ValueAnimator;
import android.animation.ArgbEvaluator;
import android.app.Activity;
import android.view.View;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableMap;

import static com.facebook.react.bridge.UiThreadUtil.runOnUiThread;
import com.facebook.react.uimanager.IllegalViewOperationException;

public class NavigationBarModule extends ReactContextBaseJavaModule {

  private static final String DURATION_SHORT_KEY = "SHORT";
  private static final String DURATION_LONG_KEY = "LONG";

  @Override
  public String getName() {
    return "NavigationBar";
  }

  public NavigationBarModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

    public void setNavigationBarTheme(Activity activity, Boolean light) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            Window window = activity.getWindow();
            int flags = window.getDecorView().getSystemUiVisibility();

            if (light) {
                flags |= View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR;
            } else {
                flags &= ~View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR;
            }

            window.getDecorView().setSystemUiVisibility(flags);
        }
    }

    @ReactMethod
    public void changeNavigationBarColor(final String color, final Boolean light, final Promise promise) {
        try {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                        if (getCurrentActivity() != null) {
                            final Window window = getCurrentActivity().getWindow();
                            Integer colorFrom = window.getNavigationBarColor();
                            Integer colorTo = Color.parseColor(String.valueOf(color));
                            // window.setNavigationBarColor(colorTo);
                            ValueAnimator colorAnimation = ValueAnimator.ofObject(new ArgbEvaluator(), colorFrom,
                                    colorTo);
                            colorAnimation.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {

                                @Override
                                public void onAnimationUpdate(ValueAnimator animator) {
                                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                                        window.setNavigationBarColor((Integer) animator.getAnimatedValue());
                                    }
                                }

                            });
                            colorAnimation.start();

                            setNavigationBarTheme(getCurrentActivity(), light);

                            WritableMap map = Arguments.createMap();
                            map.putBoolean("success", true);
                            promise.resolve(map);
                        }

                    } else {
                        promise.reject("NOT_SUPPORTED", new Throwable("Not Supported"));
                    }
                }
            });

        } catch (IllegalViewOperationException e) {
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", false);
            promise.reject("error", e);
        }

    }
}