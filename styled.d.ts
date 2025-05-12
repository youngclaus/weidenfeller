import 'styled-components';
import { Theme } from './components/Theme/themes';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}