import { MilisToSecondsPipe } from './milis-to-seconds.pipe';

describe('MilisToSecondsPipe', () => {
  it('create an instance', () => {
    const pipe = new MilisToSecondsPipe();
    expect(pipe).toBeTruthy();
  });
});
