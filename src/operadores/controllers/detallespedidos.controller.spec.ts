import { Test, TestingModule } from '@nestjs/testing';
import { DetallespedidosController } from './detallespedidos.controller';

describe('DetallespedidosController', () => {
  let controller: DetallespedidosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetallespedidosController],
    }).compile();

    controller = module.get<DetallespedidosController>(DetallespedidosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
