/**
 * So I tried to use the require.js tpl plugin, but since tpl by design has to parse the
 * tpl file to get at the string value, if the tpl file has injectable data
 * (e.g. <%= data %>), then using it would fail.  Also, Marionette's templateHelpers
 * wasn't quite working as well.
 *
 * The intent of this approach is to curb the spread of small tpl files.
 * One major issue with this approach is that the templates are not precompiled.
 * However, the efficiency of not having to deal with a myriad of small tpl files
 * during dev is the benefit that outweighs the cost of precompiled templates.
 *
 * I think if I make this into a require.js plugin, then we can precompile these
 * aggregated tpls as well.
 * @module
 */
define(function (require) {
    'use strict';
    var $ = require('jquery');
    /**
     * a hash of script IDs to html content.
     */
    var tplHash = {};

    return {
        getTpl: function (scriptId) {
            var tplString = tplHash[scriptId];
            if (!tplString) {
                throw new Error('tpl-hash: could not find tpl');
            }
            return tplString;
        },
        /**
         * The method takes the tplText, which is purely a string value of the
         * entire tpl.  Then, creates a document fragment based on the tplText
         * for easy manipulation (could have used regex as well but this was
         * simpler for me).  Then hashes the html content of each script block
         * by the script id.
         *
         * @param tplText A string of script templates
         * Pre-requisites - the tplText must only contain blocks of script tags
         */
        setTpl: function (tplText) {
            var $frag = $(document.createDocumentFragment());

            $frag.append(tplText);
            $frag.children().each(function (idx, tplElem) {
                var $tpl = $(tplElem);
                if ($tpl.is('script') === false) {
                    throw new Error('tpl-hash: found a non script tag to parse');
                }
                if (tplHash[$tpl.attr('id')]) {
                    throw new Error('tpl-hash: duplicate script id being added to tplHash');
                }
                tplHash[$tpl.attr('id')] = $tpl.html();
            });
            return this;
        }
    };
});
