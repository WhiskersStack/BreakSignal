package com.whiskersstack.breaksignal;

import android.os.Bundle;
import android.webkit.WebView;
import androidx.activity.OnBackPressedCallback;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        getOnBackPressedDispatcher()
            .addCallback(
                this,
                new OnBackPressedCallback(true) {
                    @Override
                    public void handleOnBackPressed() {
                        WebView webView = getBridge() != null ? getBridge().getWebView() : null;

                        if (webView != null && webView.canGoBack()) {
                            webView.goBack();
                            return;
                        }

                        if (webView != null && isPrivacyPage(webView.getUrl())) {
                            webView.loadUrl("https://localhost/");
                            return;
                        }

                        finish();
                    }
                }
            );
    }

    private boolean isPrivacyPage(String url) {
        return url != null && url.startsWith("https://localhost/privacy.html");
    }
}
