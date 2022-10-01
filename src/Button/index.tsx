import { Button, Image } from 'antd';
import type { ButtonProps } from 'antd';
import './index.module.scss';
import styles from './index.module.scss';
import Default from './Default'
interface newButtonProps extends ButtonProps {
  ratebtn?: string;
  playbtn?: string;
  imagebtn?: string;
  imagestyle?: Array<number>;
}
let imageEnum: any = {
  search:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAThJREFUOE+N0j+oz3EUxvHXE5HuNdgog0U3dd1JDIZrIZPuYMHKcBeTlITIaBYjVumK8c6SQf4MBoVswmyQjs7t99W3X9fl1Bk+9Xl/Ps95nhNTVVXbcR4nsRc/8Qb3upP8aiRjrqoW8ARfcGcCzOIwlvEJS0m+/QGraide4j4uJampR3fgIbZicQzexa4kJ6blD+eqavgtrq6BVbUFX3E0yYu/gZO7l3FsAOfwGtumJa5j3iJWBnAez5O0ERtWVR3C6gA28B37knz4h9RzODs25zHeJ7mwgTmb0B48GIP78QynkjxdD66qW2jXF8bgaezGFXQ0t1t2VW3GQbSbB3AkybthxuudDc5McrqJ45N168B7zVZwMcnntZWrqv7hRneSa6OwZ7CnY8bHJD/G8ht8hUdJGv7v+g2bzn1AuIW5owAAAABJRU5ErkJggg==',
  refresh:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAaVJREFUOE+Nkr9rU1EUxz/nJv9AEIuFTPoyie7i0OAqHayGDHZJcl/M4iCdWvzxrEUnXVzSvpdkKdgSqkNxlTiIo4M45emUobSU6J57r1xp5KEt5Ezn/vjc7/eec4RM1Gq187lc7j6wCFwCLPADeJfP5zfb7fbh9LpMkzAMb1truyJyAGwrpb76M2PMVRG5C5wDmkmSvI2iSP0BtdZ3gB3gaZqmLwaDwSTrpFwu50ul0ppz7qGIvHLOFeTE3hB4mSTJsyyQzb3KaDT6ACwAu6K1XgeqaZpe/lcpC9br9WtKqcfAdefcew9+EZG9OI43zlLL7lcqlVyhUJiTMAx/WWuXO53O/izgf1WdFWo0GotKqW1pNpvz4/H4sN/vm1lgrfUjYMlbfeOcuwl8staud7vdz2c94NsSBMG3aVV9/6rAx2KxeCOKIj8tp8aJ2ooxpuSruikiP51zD0RkYzgcPj9tAIIgWAWeiEg1juM98Y31KlrrJWALOM6OnLX2CrDsnLuglKp7yNv5O6t+0Wq15iaTyT3gFnARUMB3YN8Y87rX6x1N//AbLzSnRuVnIJIAAAAASUVORK5CYII=',
  alarm:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAW9JREFUOE+l002IjmEUxvHfZc8SpWRkY2Pje2eBshKy8FEoiikrWcielJ0ykmIxQylkpSayI0mWNhqiiC1rR/fb807v5H0mcjZPnfu+/891zrlO/GdksfdV9bCdJ9nfd28eUFVLsDrJx6pq+d241j08i9kkVVVr8CnJrwF8SK6qW9iFnZjBZvzozpfiNY7gWQc7OQ+oqkO4iws4ihU4jUEJaCXcwDdM4zIOJ7k3UFBVc/iA+5hq8pM8Ha27qpqyWUziICaSrG1FbcEr7MOxrg8bxzWtqt7gM+7gEbY2wHHcxnI8bjKTNNgf0U1lJfbiO040wATW4wle4Gvf2KrqAVZhO/bg3QIfVNXLvwEk2TaUNw7wJcmBnhIGChYDvMfzJKd6AM0rO5KsW6CgqpZ1c7+C82h/qu7S6LeN7yrO4WaSn0MfXMeZf9yrqSSTQ8CGZowRQMtvwsUudwnNA6M9m0vytncbu4Vqtm4x3RZpnMLfjFWKv9PWFOUAAAAASUVORK5CYII=',
  add: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAAXNSR0IArs4c6QAAAD1JREFUOE9jZMAB/v//PxckxcjImIxNCSMejfuhGh1HrEZo6ClhCQADqNgFLHL3GMnWOBod4LRKcpLDm8gBMIw7QyjCINQAAAAASUVORK5CYII=',
  qualified:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGEAAAAoCAYAAADuUZQHAAAAAXNSR0IArs4c6QAACkxJREFUaEPlWwtwlNUV/s7/7yMxCQESMNmEhw15baiDFep7ykM3IATElhmt2s5QpLSDtsrUopTW4gNHS2urg2gdp6IdqIBFNwJZUV4FLQsI8lAQrAjZhDeBsM//v6dzd7Ob3c2GzeoKbDwzmczsPffc8/jvPfc8LuErAD8K5fAw2zAVGAGBq5lQSUzFDM4DYP4KJDNtio9AZ5m4iRh7oWCrDqwpdTqc9ChEqsJQKhOO20eW+GCYDuBuAKWE4IL7AHxKhEMsGWP2p0IzE3GJyETgPGb0A1AFoIIBBcBhAK+boT1fWPd+Y1dl65IRDr85qkAxqo8xMJnBikrKSgFeROxfbalbe7yri3VXPJe9rpDJd7MCulNnMYZAgoBXRECfXXr7eyeSyZ3UCI31tjvA/BwD+QTlJWL9acv41V96Nlj7G3zaJF0XN0JVrzVkGQooy6goWaoGRTkV3CEEJxirUJ2zlmitloyZ7jDuevvm/kzqQwwxlYAWVaXpRbc6/nU+2To1Aq8ZbmhqNT/H4GkgbFQUfWrxre/tCayvqtU9+iOsi5sAkKFnNtQeWSAljhQpAEeOxyMALQQp86n6wy+6g7KTydC0YpRVCPUlMG4g0ILiXN99NCLxh5jQCLzpuuymkz2WMPOtBDxV7Mmf7S3eXUIe7QVo+hhmkJJlgLFPLsggj0IABiOQkw+YsgHVABABzIDPA7SeAgI+iaWDsASqOocqPvwkmSCZPs5vTFKbslvkMT6TiFYU9z4zia7/wBMvVwcjBHfAOfNyZh4Npmkl4xteDqyvGKW7xVLWuackoPYww9j7spCiJSgGIDsHEPLLZ0DuAlUFVFPov/yt5TigBcLrBwB6FsaTs6l8f9A63Rka366dAuIFRLSqOMd3W/yO6GAEl732BQb/HExTpQF8ayrvEh5tITjo/WHIz4JBGiA9sAmqmECVW7u9c28zxEsEetFS1/CLaPXFGCHkhLGIgLmWOscj2prKuwIe7TUwgnjy7DcWpM0AIT4IGyHOjaSaPd3+auuy255k4GFVxR3RzjpiBHkNJaPyKYj2Wtz5P9D6bh+pu8UqbtsBymVGmPrmSaWlHxhzqcb5SPoJX1oUpY9wXdayDsyVHBBV4etrRKWuett8wTxFVcWQXtnNfvh8H7HOucGPVSWYSvJBapsTjpJNDwCuvUBROWBMEiufcgFCAwr6xyuHfdDISlc6P7+01JZ+buStSdeV7QroZUud45ehwwBAWyR8AKCXS+oapnsd5Rs4IG4Ms2DskwM1N7GG311A2LcJ6HsF40ePtvvqePaPHwSWzqGgEcY+wBgwJA6D6EWq3jwt/WJfehQb7bXPAzzFDK1MRtZBIzTabXMZPENhHlSQ13idcPsXh1mXV1BzaX5C7Z49Dix8sP18+uHvGUWDEgu9egGwd1MId+AQxtgH440AD0D9qHpz0gjz0lNrahzJgE4Q7SfQvJI6x8Mkk3Guq20HFaJtxeMaJngbynexJmrCZGUwZuiVnXCVLz8G7H9qN8KIyQzr8MQMvTGbcOxgaCyvkPGTPyfAU/ghqtryTGoiZSZ2U33tW4L5e5atjgF06B3bNYrAhyDcael1aJevxf+xDMbCopksPaCYDQklPXIAWPrHdiPcPJVRGTnEYqe89RRweE8It2cRcNfTnIjmPrI6KzNTralxHb6JCgXXkusd20wIPAH4Ly/Ick0Rfn1uhBwRsgb07PSgl+f7qw8A7haCogL3zGPk9k7MzPaVwEZ5+QVw5S2Mm+7phGmFhlHV5i2piZR52C778ELAdAQKZtFhu20pATUldY5qr6PcwQFxS8QfmFSYS/LPK6E8kja8Rrh6PKNKZpM6AXmLcswH/B5g9P2AubNwgzGHapx/yDy1ps6xy26TqZtd0gg7CdhfUueY6HWUH+WA6BMmF4wNLpd1mgsJ/C5Zt9gu5IoXa61Gu+3fDAwil732GBEvKh7nuN+zskyDgEz2BEHNMcHYNxgqXEhoJKuz9EIueLHWaqq3/Y2Z7qRGu81LRPMs4xpmeVaUiXCKQjJ2cXYCvGR1Jr6OXSxtfUPruuprn2DmGTFG8K4o08NpiqARzCpMllif4D4NeFsB1QhofsDnDkXBMkHqOQPoWiiTLTPa4Wy2TK6KQGhM/gk9NCbxJJ3epTLYi0iqkdVp/IbkvqTIRowQfRx5Gwa5WeP2r5CArAG9Ym5Hi2cRThxKryxVNzJGTQ3T5FaybrnQjii9AnWRWuQ4inPM2zggroqmYSrKg5Ld/mGufQXYvTa9WbxR90bdrAj/o2rnd7ooR0ajuaRjJpSRy25bAmCwpc5R7XMMekIEOCabqeaZYSzMiQjbtA948/H0GuGnz8bEF+vI6uwk7s5onXdgPnJFjQ7W+uQ312hnA2ujsWXt2NSvZ3sNmYFljwPNn6XHEKVWxoSZMfz9lazOX3cvdXeUJiZYi05blIxzLPY6yg9zQJRET5OFHFnQCYNMVyx7jIJ1fJUIhcYs9Daa0deUBa/QcSrgg8vnQauM0JLA+IcY/QbHmH0cWTe/k2xepo/HpC3iE3i+dytmxqQuwvWE0qjdAMC5HPiiPhvDexUjTxb540AwY9uZE9jRerJTfZUNY4y+L3qYj4Hdpd+GKltMAk+qIDqVXTzg6Amfy93EItjSGIF43yAOZsOzoBRqqPTcKWw7cxwfne1oiML+jImzQlfZCBDNoOrNifKrmf7hx/DfIZUtR+OLOv73KqbrXv25eMlli4uaawKfNsD3/ADgXOLsavy81SdcOCiDizYoqWKM+RVgbvf3siNjG9h93bdhFyQs6kjduOy2+QKh8qZs8oqvrgX1RwjmkvSVpdCdwe6XLsE5XcPi5s9hMAFXjWUMHY9g1jUKTsKsXEtl//2sSwQzGKnT8qaUKb7QD8vHl3vPalshUBQjMwG0fAj4SGqZhQNXHsTAMV7kdLSdbIYaTVbn+gzWbZdYT1rol1TiW154Y/Vg39nAhnDTV3ClgAL84/sAp3ZFNd7eDHVYSzyzXjAmUo1zVZekyHCkpC0vYfk6NH+tq/ouezQH6xzaEW4j8PrQlNVhsB2DYUSUg2acgkGMp8qt/0mZWAZO6HLzl5QtURskrxvcz+/1vik0Dmn/1aGAL7Ucm/G2I1CvOQ3hDUD4tR1C0B3m63d+moH6TJnllNsgg4ZI0BCMSUvY/37lHPbrv+V1Aw34JNZVJONM/dlucK7nFAvxuHnUvr8QyQbV7g1fuSE4rJbOWuPd6wb3U/Zl/w71FfdypCP4/MqkPp5G5cc7nzT2yPs7Dd2aPIzuBrb52q3x0Tro7JGId8Ldsl/iN8n0RcBpAt9gfuufe5LhdofxtD4SiVZI8LmUSX2MOfa5VP6ygivUk6osynfSAMkfKEJMNtsXdeuzXybjmEyxz6UIrwh/mp5LRRsj4cNBn3LU2GwopFbVQIG211rSr+TqO7wV3uWhxwndC8IPB0Xbw0G6EA8H41UY/YRWCMgbU6UCKvq2PaEV4GYAexUFW77OE9r/Azquufo2mLAnAAAAAElFTkSuQmCC',
  good: 'data:image/png;base64,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',
  unqualified:
    'data:image/png;base64,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',
  arrowleft:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAOCAYAAAAi2ky3AAAAAXNSR0IArs4c6QAAASNJREFUOE+l07FKxTAUBuD/hAZfwMHJTeTq6Cu4uzela0cRpwteifoAiouDaw8UBHcF3cTV3UkQBwdBOlQqSSQXI7VW6a0Zf3K+kJMTQscqimJkjLkAsK2UOuva086oHXjEWnvtnFtwzm0lSXI0M9REfPEgqI0MgrqQz+vcAbgPVyOiJ+fcoVLqIWRaa6G1tvQH8ltrHqWUoyiK5qqqugSwCmBMzOz1xT4NDXuEEOsAlqy1Jz4jolcP7QA4mAGyUsrluq7nAdwQkQBwNX1+Zp4A2O+BvRHROI7j6Ugw8xqAFWPM+dcc5Xm+S0R7TUwIMXHOnYasLMuXLMveuw78NpBtbNAchVOa2L8gDzawTaXUcY/e4cdfC0XMvGGMuU3T9LkP9AH0rpvtSpH5PQAAAABJRU5ErkJggg==',
  arrowright:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAOCAYAAAAi2ky3AAAAAXNSR0IArs4c6QAAASFJREFUOE+d0j1LxTAUBuD3JFgsUgQHBxGc3F3F7Q66C0IhnQUX8f4ANSjoJOLYNTTd3fUnOKqIm5ODg6uk9EiKlVoqpDfzOc/5CiHwWWv3AFxJKXfSNH3up1Ggg6IojojomojehRCTPjYa8oWHsJmgIayBtNZCa123Y1pr14hoyswrndHXAWx0V9HtjKy1UwCXAB7jON6uqurLOeeXuRqyvxajsiw/mXnRJwkhDgC81nV9F4J0Yt58R/cAJszsR9uKoujDOffi3RHYMRljFqSUuwCelFIPPvln3AsA8wHYiVLq/N+r5Xk+lyTJUgsx8z6Asx7cIM0VAyo2Ie2H7MCnWZb9wjNBzPwHGdWRtfYQwM0QMgoyxixLKTeVUrdD6/gGsiB3axH5LPUAAAAASUVORK5CYII='
};
const App = ({ ratebtn, playbtn, imagebtn, imagestyle = [16, 16], ...props }: newButtonProps) => {
  if (ratebtn) {
    return (
      <Button className={styles.ratebtn} icon={<img src={imageEnum[ratebtn]} />} {...props}>
        {props.children}
      </Button>
    );
  } else if (imagebtn) {
    return (
      <Button
        className={styles.mybtn}
        icon={
          <Image
            src={imageEnum[imagebtn]}
            width={imagestyle[0]}
            height={imagestyle[1]}
            preview={false}
          />
        }
        {...props}
      >
        {props.children}
      </Button>
    );
  } else {
    return (
      <Button className={styles.mybtn} {...props}>
        {props.children}
      </Button>
    );
  }
};
App.Default=Default
export default App;
