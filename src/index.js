/**
 * Redaxo4Embedded -- a Nextcloud App for embedding Redaxo4.
 *
 * @author Claus-Justus Heine <himself@claus-justus-heine.de>
 * @copyright Claus-Justus Heine 2020, 2021
 *
 * Redaxo4Embedded is free software: you can redistribute it and/or
 * modify it under the terms of the GNU AFFERO GENERAL PUBLIC LICENSE
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * Redaxo4Embedded is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU AFFERO GENERAL PUBLIC LICENSE for more details.
 *
 * You should have received a copy of the GNU Affero General Public
 * License along with Redaxo4Embedded.  If not, see
 * <http://www.gnu.org/licenses/>.
 */

import { webPrefix } from './config.js';
import { loadHandler } from './redaxo4.js';
import '../style/redaxo4.css';

const jQuery = require('jquery');
const $ = jQuery;

$(function() {

  console.info('Redaxo4 webPrefix', webPrefix);
  const container = $('#' + webPrefix + '_container');
  const frameWrapper = $('#' + webPrefix + 'FrameWrapper');
  const frame = $('#' + webPrefix + 'Frame');
  const contents = frame.contents();

  const setHeightCallback = function() {
    container.height($('#content').height());
  };

  if (frame.length > 0) {
    frame.on('load', function() {
      console.info(frameWrapper);
      loadHandler($(this), frameWrapper, setHeightCallback);
    });

    let resizeTimer;
    $(window).resize(function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(setHeightCallback);
    });
  }
  if (contents.find('ul.rex-logout').length > 0) {
    loadHandler(frame, frameWrapper, setHeightCallback);
  }

});

// Local Variables: ***
// js-indent-level: 2 ***
// indent-tabs-mode: nil ***
// End: ***
