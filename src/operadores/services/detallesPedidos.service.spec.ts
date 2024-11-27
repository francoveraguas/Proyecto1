import { Test, TestingModule } from '@nestjs/testing';
import { DetallesPedidosService } from './detallesPedidos.service';

describe('DetallespedidosService', () => {
  let service: DetallesPedidosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetallesPedidosService],
    }).compile();

    service = module.get<DetallesPedidosService>(DetallesPedidosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
