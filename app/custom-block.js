import { AffineSlashMenuWidget, DocEditorBlockSpecs } from '@blocksuite/blocks';
import { literal } from "lit/static-html.js";

const SlashMenuWidget = AffineSlashMenuWidget;

const menus = SlashMenuWidget.DEFAULT_OPTIONS.menus.filter((element, index) => index !== 3);

class CustomSlashMenu extends SlashMenuWidget {
  options = {
    ...SlashMenuWidget.DEFAULT_OPTIONS,
    menus,
  };
}

if(!customElements.get("affine-custom-slash-menu")) customElements.define("affine-custom-slash-menu", CustomSlashMenu);


const docSpecs = DocEditorBlockSpecs;
const pageBlockSpec = docSpecs.shift();
if (!pageBlockSpec) throw new Error("Can't find pageBlockSpec");
pageBlockSpec.view.widgets = [literal`affine-custom-slash-menu`];
docSpecs.unshift(pageBlockSpec);

export { docSpecs };
