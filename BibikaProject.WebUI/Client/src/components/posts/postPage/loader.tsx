import React from 'react'
import { useNavigate } from 'react-router';

const PostPageLoadingPage  = () => { 
    const navigate = useNavigate();

    const onGoBack = () => {
        navigate(-1);
      };

  return (
    <div className="post-page-container">
    <div className="post-page-go-back">
      <a onClick={onGoBack}>&lt; Назад</a>
    </div>

    <div className="post-page-images">
      <div className="post-page-current-image">
        <svg width="124" height="105" viewBox="0 0 124 105" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M124 61.8725C124 45.4629 117.468 29.7254 105.841 18.122C94.2134 6.51869 78.4434 1.23889e-06 62 0C45.5566 -1.23889e-06 29.7866 6.51869 18.1594 18.122C6.53213 29.7254 2.48289e-06 45.4629 0 61.8725H18.7859C18.7859 50.435 23.3388 39.4659 31.4431 31.3784C39.5473 23.2908 50.5389 18.7473 62 18.7473C73.4611 18.7473 84.4527 23.2908 92.557 31.3784C100.661 39.4659 105.214 50.435 105.214 61.8725H124Z" fill="#219CE1" fill-opacity="0.5"/>
            <path d="M105.358 61.7315C105.358 67.4136 104.234 73.0401 102.052 78.2897C99.8694 83.5392 96.6705 88.3091 92.6378 92.327C88.6051 96.3448 83.8176 99.5319 78.5487 101.706C73.2797 103.881 67.6325 105 61.9294 105C56.2263 105 50.5791 103.881 45.3101 101.706C40.0412 99.5319 35.2537 96.3448 31.221 92.327C27.1883 88.3091 23.9894 83.5392 21.8069 78.2897C19.6244 73.0401 18.5011 67.4136 18.5011 61.7315H36.1418C36.1418 65.1056 36.8089 68.4465 38.1048 71.5637C39.4007 74.6809 41.3002 77.5132 43.6948 79.899C46.0894 82.2848 48.9322 84.1773 52.0609 85.4685C55.1896 86.7597 58.5429 87.4242 61.9294 87.4242C65.3159 87.4242 68.6692 86.7597 71.7978 85.4685C74.9265 84.1773 77.7693 82.2848 80.1639 79.899C82.5585 77.5132 84.458 74.6809 85.754 71.5637C87.0499 68.4465 87.7169 65.1056 87.7169 61.7315H105.358Z" fill="#219CE1" fill-opacity="0.5"/>
            <path d="M87.5626 61.7315C87.5626 54.8911 84.8546 48.3308 80.0341 43.4939C75.2137 38.657 68.6759 35.9396 61.8588 35.9396C55.0417 35.9396 48.5038 38.657 43.6834 43.4939C38.863 48.3308 36.1549 54.8911 36.1549 61.7315L48.754 61.7315C48.754 58.244 50.1347 54.8994 52.5923 52.4333C55.0499 49.9673 58.3832 48.5819 61.8588 48.5819C65.3344 48.5819 68.6676 49.9673 71.1252 52.4333C73.5828 54.8994 74.9635 58.244 74.9635 61.7315H87.5626Z" fill="#219CE1" fill-opacity="0.5"/>
        </svg>

      </div>

      <div className="post-page-side-images">

        <div className="post-page-side-image">
            
        </div>

        <div className="post-page-side-image">
            
        </div>

        <div className="post-page-side-image">
            
        </div>

        <div className="post-page-side-image">
            
        </div>

      </div>
    </div>

    <div className="post-page-user-block-loading">
      <div className="post-page-user-avatar">
        <span></span>
      </div>
      <div className="post-page-user-info">
        <div className="user-name"></div>
        <div className="user-rating"></div>
        <div className="user-location"></div>
      </div>
      <div className="post-page-user-buttons">
        <div className="button-message">Message</div>
        <div className="button-phone">
          <svg
            width="33"
            height="32"
            viewBox="0 0 33 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.20834 1.96243L8.20836 1.96245L11.7981 6.57414C11.7982 6.57425 11.7983 6.57435 11.7984 6.57445C12.2672 7.17749 12.4329 7.96345 12.2473 8.70567L12.2473 8.70588L11.1533 13.0859L11.1532 13.0863C11.0549 13.4804 11.0602 13.8933 11.1686 14.2848C11.277 14.6763 11.4847 15.0331 11.7717 15.3207L11.7724 15.3213L16.6864 20.2353L16.6867 20.2357C16.9746 20.5232 17.332 20.7313 17.7242 20.8397C18.1161 20.9481 18.5294 20.9531 18.9239 20.8544C18.9241 20.8543 18.9244 20.8543 18.9246 20.8542L23.3019 19.7604L23.302 19.7603C23.6682 19.6688 24.0504 19.6617 24.4197 19.7395C24.7891 19.8174 25.1358 19.9782 25.4339 20.2098L30.0454 23.7975C31.2293 24.7185 31.3364 26.4665 30.2788 27.5226L30.2784 27.5231L28.2104 29.5911C26.9695 30.8319 25.1526 31.3424 23.4956 30.759L23.4954 30.7589C18.3594 28.9518 13.6961 26.0115 9.85158 22.1561L9.84956 22.1541C5.99453 18.3102 3.0543 13.6478 1.2469 8.51263C0.665135 6.85733 1.17572 5.03816 2.41658 3.79731L4.48405 1.72984C4.48407 1.72982 4.4841 1.72979 4.48412 1.72976C4.73379 1.4805 5.03357 1.28713 5.3636 1.16248C5.69368 1.03781 6.04647 0.984711 6.39862 1.0067C6.75077 1.0287 7.09422 1.12528 7.40621 1.29004C7.71821 1.45481 7.99163 1.684 8.20834 1.96243Z"
              stroke="#E06738"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    </div>

    <div className="post-page-title-loading">
      <div className="title"></div>
      <div className="price">
        <span className="dot"></span>
        <span className="uan"></span>
      </div>
    </div>

    <div className="post-page-description">
      <div className="post-page-description-loading-line">

      </div>
      <div className="post-page-description-loading-line">

      </div>
      <div className="post-page-description-loading-line">

      </div>
      <div className="post-page-description-loading-half-line">

      </div>
    </div>

    <div className="post-page-specs">
      <div className="specs-header">

      </div>

      <div className="specs-body">

      </div>
    </div>
  </div>
  )
}

export default PostPageLoadingPage