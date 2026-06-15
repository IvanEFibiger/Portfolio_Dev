import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlockEditorComponent } from './block-editor.component';
import { ArticleContentBlock } from '../../models/content-block.model';

describe('BlockEditorComponent', () => {
  let fixture: ComponentFixture<BlockEditorComponent>;
  let component: BlockEditorComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockEditorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BlockEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('agrega un bloque e incrementa la lista', () => {
    expect(component.blocks()).toHaveSize(0);

    component.addBlock('paragraph');
    fixture.detectChanges();

    expect(component.blocks()).toHaveSize(1);
    expect(component.blocks()[0]).toEqual({ type: 'paragraph', text: '' });
  });

  it('elimina un bloque existente', () => {
    const blocks: ArticleContentBlock[] = [
      { type: 'paragraph', text: 'Intro' },
      { type: 'quote', text: 'Cita' },
    ];
    component.blocks.set(blocks);

    component.removeBlock(0);
    fixture.detectChanges();

    expect(component.blocks()).toEqual([{ type: 'quote', text: 'Cita' }]);
  });

  it('reordena los bloques al moverlos', () => {
    const blocks: ArticleContentBlock[] = [
      { type: 'paragraph', text: 'Primero' },
      { type: 'heading', level: 2, text: 'Segundo' },
    ];
    component.blocks.set(blocks);

    component.moveBlock(1, -1);
    fixture.detectChanges();

    expect(component.blocks()).toEqual([
      { type: 'heading', level: 2, text: 'Segundo' },
      { type: 'paragraph', text: 'Primero' },
    ]);
  });
});
