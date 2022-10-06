$(function(){

    // drawer
    $(document).ready(function() {
        $('.drawer').drawer();
        $('.drawer-nav a').on('click', function() {
            $('.drawer').drawer('close');
        });
    });

    // smoothscroll
    $('a[href^="#"]').click(function(){

        // 移動先を0px調整する。0を30にすると30px下にずらすことができる。
        var adjust = 0;
        // スクロールの速度
        var speed = 400; // ミリ秒
        // アンカーの値取得
        var href= $(this).attr("href");
        // 移動先を取得
        var target = $(href == "#" || href == "" ? 'html' : href);
        // 移動先を調整
        var position = target.offset().top + adjust;

        // スムーススクロール
        $('body,html').animate(
            {
                scrollTop:position - $('#js-header').outerHeight()
            },
            speed
        );
        return false;
    });

    // wow
    new WOW().init();

    var target = '#js-form input';

    //キー操作、状態変化をトリガーに実行
    $(target, '#js-form textarea').on('keydown keyup keypress change', function(){

        //判定用のフラグ
        let flag = true;

        //指定要素をループで１つずつ確認
        $(target).each(function(e) {
            if ($(target).eq(e).val() === "") {
                flag = false;
            }
        });

        //フラグをみてtrueなら送信ボタンを有効。falseなら無効にする
        if (flag) {
            //必須項目すべて入力済みであれば有効にする
            $('#js-submit').removeClass("disabled");
        }
        else {
            //未入力など漏れがある場合は無効にする
            $('#js-submit').addClass("disabled");
        }
    });

    // テキストアニメーション
    var TxtRotate = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
      };

      TxtRotate.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
          this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
          this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 300 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
          delta = this.period;
          this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
          this.isDeleting = false;
          this.loopNum++;
          delta = 500;
        }

        setTimeout(function() {
          that.tick();
        }, delta);
      };

      window.onload = function() {
        var elements = document.getElementsByClassName('txt-rotate');
        for (var i=0; i<elements.length; i++) {
          var toRotate = elements[i].getAttribute('data-rotate');
          var period = elements[i].getAttribute('data-period');
          if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
          }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
        document.body.appendChild(css);
      };
});