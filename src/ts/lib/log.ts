import UtilDf from '@/ts/util/util.df';

class Log {
  public static error = UtilDf.getIsDev()
    ? console.log.bind(console, '> %c %s', 'color: #ff0000; font-weight:bold;')
    : () => {};

  public static cycle = UtilDf.getIsDev()
    ? console.log.bind(console, '> %c %s', 'color: #ff9700; font-weight:bold;')
    : () => {};

  // prettier-ignore
  public static status =  UtilDf.getIsDev()?console.log.bind(
    console,
    '- %c %s',
    'color: #00c08b;'
  ):()=>{};
  // prettier-ignore
  // public static console = UtilDf.getIsDev()? console.log.bind(console):()=>{};
  public static console =  console.log.bind(console);
}

export default Log;
