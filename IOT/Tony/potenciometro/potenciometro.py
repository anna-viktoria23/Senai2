from machine import Pin, ADC, PWM #usar na porta 26, 27 e 28 #PWM para a frequencia
from utime import sleep

#declarar o potenciometro
pot = ADC(28)
led = PWM(Pin(17))
led.freq(1000)

led.duty_u16(0)

while True:
    #variavel valor guardando od dados do potenciometro
    valor = pot.read_u16() #quando utiliza a porta ADC é para fazer a leitura
    
    #convertendo a leitura ADC para porcentagem (o valor)
    porcValor = int((valor * 100) / 65535)
    
    #print("Valor porcentagem: ",porcValor) #mostra o valor
    print(f"Valor porcentagem: {porcValor}%") #mostra o valor com o simbolo
    
    #convertendo para modelo de mapeamento (FUNÇÃO MAP)
    def mapear(leitura_potenciometro, in_min, in_max, out_min, out_max):
        return int((leitura_potenciometro - in_min) * (out_max - out_min) / (in_max - in_min) + out_min)
    #Variavel que pega o valor real do potenciometro - minimo e maximo do leitura_potenciometro - e faz a conta
    
    #variavel para função
    valorMapeado = mapear(valor, 0, 65535, 0, 255)
    print(f"Valor Mapeado: ", valorMapeado)
    
    led.duty_u16(valor)
    sleep(0.8)
    
    
    