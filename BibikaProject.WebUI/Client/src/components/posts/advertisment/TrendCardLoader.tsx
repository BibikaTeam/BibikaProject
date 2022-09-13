import React from 'react'

const TrendCardLoader = () => {
  return (
    <div className="main-car-card-loader">        
        <div className='car-card-img-loader'>
          <svg width="124" height="105" viewBox="0 0 124 105" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M124 61.8725C124 45.4629 117.468 29.7254 105.841 18.122C94.2134 6.51869 78.4434 1.23889e-06 62 0C45.5566 -1.23889e-06 29.7866 6.51869 18.1594 18.122C6.53213 29.7254 2.48289e-06 45.4629 0 61.8725H18.7859C18.7859 50.435 23.3388 39.4659 31.4431 31.3784C39.5473 23.2908 50.5389 18.7473 62 18.7473C73.4611 18.7473 84.4528 23.2908 92.557 31.3784C100.661 39.4659 105.214 50.435 105.214 61.8725H124Z" fill="#219CE1" fill-opacity="0.5"/>
            <path d="M105.358 61.7315C105.358 67.4136 104.234 73.0401 102.052 78.2897C99.8694 83.5392 96.6705 88.3091 92.6378 92.327C88.6051 96.3448 83.8176 99.5319 78.5487 101.706C73.2797 103.881 67.6325 105 61.9294 105C56.2263 105 50.5791 103.881 45.3101 101.706C40.0412 99.5319 35.2537 96.3448 31.221 92.327C27.1883 88.3091 23.9894 83.5392 21.8069 78.2897C19.6244 73.0401 18.5011 67.4136 18.5011 61.7315H36.1418C36.1418 65.1056 36.8088 68.4465 38.1048 71.5637C39.4007 74.6809 41.3002 77.5132 43.6948 79.899C46.0894 82.2848 48.9322 84.1773 52.0609 85.4685C55.1896 86.7597 58.5429 87.4242 61.9294 87.4242C65.3158 87.4242 68.6692 86.7597 71.7979 85.4685C74.9265 84.1773 77.7693 82.2848 80.1639 79.899C82.5585 77.5132 84.458 74.6809 85.754 71.5637C87.0499 68.4465 87.7169 65.1056 87.7169 61.7315H105.358Z" fill="#219CE1" fill-opacity="0.5"/>
            <path d="M87.5626 61.7315C87.5626 54.8911 84.8546 48.3308 80.0341 43.4939C75.2137 38.657 68.6759 35.9396 61.8588 35.9396C55.0417 35.9396 48.5038 38.657 43.6834 43.4939C38.863 48.3308 36.1549 54.8911 36.1549 61.7315L48.754 61.7315C48.754 58.244 50.1347 54.8994 52.5923 52.4333C55.0499 49.9673 58.3832 48.5819 61.8588 48.5819C65.3344 48.5819 68.6676 49.9673 71.1252 52.4333C73.5828 54.8994 74.9635 58.244 74.9635 61.7315H87.5626Z" fill="#219CE1" fill-opacity="0.5"/>
          </svg>
        </div>
        <div className="car-card-info-loader">
          <div className="car-card-line-loader"></div>
          <div className="car-card-small-line-loader"></div>
          <div className="car-card-tags">
            <div className="car-card-tag-small"></div>
            <div className="car-card-tag"></div>
            <div className="car-card-tag"></div>
          </div>
        </div>
        <div className="car-card-contacts-loader">
          <div className="car-card-line-loader"></div>
          <div className="buttons-container">
                <button className="write-btn">Message</button>
                <button className="call-btn">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.20084 1.96246L8.20085 1.96248L11.7906 6.57417C11.7907 6.57428 11.7908 6.57438 11.7909 6.57448C12.2597 7.17752 12.4254 7.96348 12.2398 8.7057L12.2398 8.70591L11.1458 13.0859L11.1457 13.0863C11.0474 13.4805 11.0527 13.8933 11.1611 14.2848C11.2695 14.6763 11.4772 15.0332 11.7642 15.3207L11.7649 15.3213L16.6789 20.2353L16.6792 20.2357C16.9671 20.5233 17.3245 20.7314 17.7167 20.8398C18.1086 20.9481 18.5219 20.9531 18.9164 20.8544C18.9166 20.8543 18.9168 20.8543 18.9171 20.8542L23.2944 19.7604L23.2945 19.7604C23.6607 19.6688 24.0429 19.6617 24.4122 19.7396C24.7815 19.8174 25.1283 19.9783 25.4264 20.2099L30.0379 23.7975C31.2217 24.7186 31.3289 26.4665 30.2713 27.5226L30.2709 27.5231L28.2029 29.5911C26.962 30.832 25.1451 31.3424 23.4881 30.759L23.4879 30.7589C18.3519 28.9518 13.6886 26.0115 9.84407 22.1561L9.84205 22.1541C5.98702 18.3102 3.04679 13.6478 1.23939 8.51266C0.657628 6.85736 1.16822 5.03819 2.40907 3.79734L4.47654 1.72987C4.47657 1.72985 4.47659 1.72982 4.47662 1.72979C4.72628 1.48053 5.02606 1.28716 5.3561 1.16251C5.68617 1.03784 6.03897 0.984742 6.39111 1.00673C6.74326 1.02873 7.08671 1.12531 7.39871 1.29007C7.7107 1.45484 7.98412 1.68403 8.20084 1.96246Z"
                      stroke="#E06738"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
              </div>
        </div>
    </div>
  )
}

export default TrendCardLoader;