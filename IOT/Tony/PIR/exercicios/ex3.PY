from machine import Pin, PWM
from utime import sleep

sensor_presenca = Pin(16, Pin.IN)
buzzer = PWM(Pin(17))

buzzer.freq(1000)

while True:
    leitura_sensor = sensor_presenca.value()
    
    if (leitura_sensor == 1):
        print("Presença detectada")
        buzzer.duty_u16(62200)
    else:
        print("Nada detectado")
        buzzer.duty_u16(0)
        
        
    sleep(0.5)