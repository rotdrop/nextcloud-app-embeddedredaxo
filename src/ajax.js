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

import { appName } from './config.js';

/**
 * Fetch data from an error response.
 *
 * @param {Object} xhr jqXHR, see fail() method of jQuery ajax.
 *
 * @param {Object} status from jQuery, see fail() method of jQuery ajax.
 *
 * @param {Object} errorThrown, see fail() method of jQuery ajax.
 *
 * @returns {Array}
 */
const ajaxFailData = function(xhr, status, errorThrown) {
  const ct = xhr.getResponseHeader('content-type') || '';
  let data = {
    error: errorThrown,
    status,
    message: t(appName, 'Unknown JSON error response to AJAX call: {status} / {error}'),
  };
  if (ct.indexOf('html') > -1) {
    console.debug('html response', xhr, status, errorThrown);
    console.debug(xhr.status);
    data.message = t(appName, 'HTTP error response to AJAX call: {code} / {error}', {
      code: xhr.status, error: errorThrown,
    });
  } else if (ct.indexOf('json') > -1) {
    const response = JSON.parse(xhr.responseText);
    // console.info('XHR response text', xhr.responseText);
    // console.log('JSON response', response);
    data = {...data, ...response };
  } else {
    console.log('unknown response');
  }
  // console.info(data);
  return data;
};

export default ajaxFailData;

// Local Variables: ***
// js-indent-level: 2 ***
// indent-tabs-mode: nil ***
// End: ***
